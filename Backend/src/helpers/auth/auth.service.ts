import { Request } from 'express'
import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { Http } from '../http/statusCode'
import { prisma } from '../database/prisma'
import { MyError } from '../error/error'
import { configs } from '../configs'
import { hash, verifyHash } from '../cryptography/hashing'

// ================================================================

/**
 * Generate a jwt access or refresh token
 */
const generateJWTToken = ({ payload, secret, expiresIn }: any) => {
    return jwt.sign(payload, secret, { expiresIn })
}

// ================================================================

/**
 * Verify a given token
 * verify that token was created with the same secret ( hash )
 * from the same server
 * token comes in user comes out
 */
export const verifyJWTToken = (token: string, secret: string) => {
    return new Promise((resolve) => {
        jwt.verify(token, secret, (err, payload) => {
            if (err) resolve(null)
            return resolve(payload)
        })
    })
}

// ==============================================================

export type AuthedUser = {
    user: User
    accessToken: string
    refreshToken: string
}

// ==============================================================

/**
 * Get User By Email
 * and check if the user account status is in inActive
 * if in active it will throw error;
 */
const getUserByEmail = async (email: string): Promise<User> => {
    email = email.toLowerCase()
    const user: any = await prisma.user.findUnique({
        where: { email }
    })
    if (!user) MyError(Http.NotFound, 'user not found', 'REST')
    if (user?.status === 'inActive')
        MyError(Http.Forbidden, 'user is inactive', 'REST')
    return user
}

// ==============================================================

/**
 * Get User By Id
 */
const findUserById = async (id: string): Promise<User> => {
    const user: any | undefined = await prisma.user.findUnique({
        where: { id }
    })
    if (!user) MyError(Http.NotFound, 'user not found')
    return user
}

// ==============================================================

/**
 * Get Authenticated User as: user, accessToken, refreshToken
 */
const getAuthedUser = async (user: User): Promise<AuthedUser> => {
    const payload = { id: user?.id }
    const authedUser: AuthedUser = {
        user,
        accessToken: generateJWTToken({
            payload,
            secret: configs.ACCESS_TOKEN_SECRET,
            expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRES,
        }),
        refreshToken: generateJWTToken({
            payload,
            secret: configs.JWT_REFRESH_TOKEN_EXPIRES,
            expiresIn: configs.JWT_REFRESH_TOKEN_EXPIRES,
        }),
    }
    // await setCacheAuthedUser(authedUser)
    return authedUser
}

// ==============================================================

/**
 * Single Sign On ( SSO )
 * using facebook or google or apple
 * open id connect from the client
 */
const singleSignOn = async ({
    email,
    name,
    ssoVendor,
    ssoVendorId,
}: {
    email: string
    name: string
    ssoVendor: 'facebookId' | 'appleId' | 'googleId'
    ssoVendorId: string
}): Promise<AuthedUser> => {
    // Check if sso vendor valid
    if (!['facebookId', 'appleId', 'googleId'].includes(ssoVendor)) {
        MyError(Http.BadRequest, 'ssoVendor is not valid', 'REST')
    }

    // Check if user already exists to decide to register or login
    const user: any = await prisma.user.findFirst({
        where: { email, [ssoVendor]: ssoVendorId },
    })

    // if user found so it's already registered , just log the user in
    if (user?.id) return await getAuthedUser(user)

    //  if not found so we need to register this user
    const newUser = await prisma.user.create({
        // @ts-ignore
        data: { email, name, [ssoVendor]: ssoVendorId },
    })

    return await getAuthedUser(newUser)
}

// ==================================================================

/**
 * Register
 * create a regular user
 * with regular role and permissions
 */
const register = async ({
    email,
    name,
    password,
    type = "USER",
}: {
    email: string
    name: string
    password: string
    type: "USER" | "ADMIN"
    token?: string
}) => {
    email = email.toLowerCase()
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: await hash(password),
            type
        }
    })

    const accessToken = generateJWTToken({
        payload: { id: user.id },
        secret: configs.ACCESS_TOKEN_SECRET,
        expiresIn: configs.JWT_ACCESS_TOKEN_EXPIRES,
    })

    const { password: _, ...result } = user
    return { ...result, accessToken }
}

// ==============================================================

/**
 * Login
 * @param email
 * @param password
 * @returns Promise<{ user, accessToken, refreshToken }>
 */
const login = async ({
    email,
    password,
}: {
    email: string
    password: string
}): Promise<AuthedUser> => {
    email = email.toLowerCase()
    const {
        password: hashedPassword,
        ...user
    }: any = await getUserByEmail(email)

    if (!hashedPassword)
        MyError(Http.Conflict, 'Sorry your password is incorrect', 'REST')

    const isPasswordValid = await verifyHash(password, hashedPassword)
    if (!isPasswordValid)
        MyError(Http.Unauthorized, 'Sorry email and password are incorrect', 'REST')

    return await getAuthedUser(user)
}

// // ==============================================================

// const changePassword = async (
//     { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
//     req: Request
// ) => {
//     const currUserId = await me(req)
//     if (!currUserId)
//         MyError(Http.Forbidden, 'you need to login, resource is protected.', 'REST')

//     const user = await prisma.user.findUnique({
//         where: {
//             id: currUserId,
//         },
//     })
//     if (!user)
//         MyError(Http.NotFound, 'User with the current token is not found', 'REST')

//     const samePassword = await verifyHash(oldPassword, user!.password)
//     if (!samePassword) return { message: 'Old password is incorrect.' }

//     await prisma.user.update({
//         data: {
//             password: await hash(newPassword),
//         },
//         where: {
//             id: currUserId,
//         },
//     })

//     return { message: 'Password changed successfully.' }
// }

// ==============================================================

/**
 * Deactivate Account
 */
// const deactivateAccount = async ({ email }: { email: string }) => {
//   const user = await getUserByEmail(email)
//   return await prisma.user.update({
//     // @ts-ignore
//     data: { status: 'InActive' },
//     where: { id: user?.id },
//   })
// }

// ==============================================================

/**
 * Me get user
 * it get the user from req.user
 */
const me = async (req: Request) => {
    if (req?.headers?.authorization) {
        const payload = await verifyJWTToken(
            req.headers.authorization.split(' ')[1],
            configs.ACCESS_TOKEN_SECRET
        )
        return (payload as any).id
    }
    return null
}

// ==============================================================

export const authService = {
    singleSignOn,
    register,
    findUserById,
    login,
    // changePassword,
    // deactivateAccount,
    verifyJWTToken,
    me,
}
