"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.verifyJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCode_1 = require("../http/statusCode");
const prisma_1 = require("../database/prisma");
const error_1 = require("../error/error");
const configs_1 = require("../configs");
const hashing_1 = require("../cryptography/hashing");
// ================================================================
/**
 * Generate a jwt access or refresh token
 */
const generateJWTToken = ({ payload, secret, expiresIn }) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
// ================================================================
/**
 * Verify a given token
 * verify that token was created with the same secret ( hash )
 * from the same server
 * token comes in user comes out
 */
const verifyJWTToken = (token, secret) => {
    return new Promise((resolve) => {
        jsonwebtoken_1.default.verify(token, secret, (err, payload) => {
            if (err)
                resolve(null);
            return resolve(payload);
        });
    });
};
exports.verifyJWTToken = verifyJWTToken;
// ==============================================================
/**
 * Get User By Email
 * and check if the user account status is in inActive
 * if in active it will throw error;
 */
const getUserByEmail = async (email) => {
    email = email.toLowerCase();
    const user = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user)
        (0, error_1.MyError)(statusCode_1.Http.NotFound, 'user not found', 'REST');
    if ((user === null || user === void 0 ? void 0 : user.status) === 'inActive')
        (0, error_1.MyError)(statusCode_1.Http.Forbidden, 'user is inactive', 'REST');
    return user;
};
// ==============================================================
/**
 * Get User By Id
 */
const findUserById = async (id) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { id }
    });
    if (!user)
        (0, error_1.MyError)(statusCode_1.Http.NotFound, 'user not found');
    return user;
};
// ==============================================================
/**
 * Get Authenticated User as: user, accessToken, refreshToken
 */
const getAuthedUser = async (user) => {
    const payload = { id: user === null || user === void 0 ? void 0 : user.id };
    const authedUser = {
        user,
        accessToken: generateJWTToken({
            payload,
            secret: configs_1.configs.ACCESS_TOKEN_SECRET,
            expiresIn: configs_1.configs.JWT_ACCESS_TOKEN_EXPIRES,
        }),
        refreshToken: generateJWTToken({
            payload,
            secret: configs_1.configs.JWT_REFRESH_TOKEN_EXPIRES,
            expiresIn: configs_1.configs.JWT_REFRESH_TOKEN_EXPIRES,
        }),
    };
    // await setCacheAuthedUser(authedUser)
    return authedUser;
};
// ==============================================================
/**
 * Single Sign On ( SSO )
 * using facebook or google or apple
 * open id connect from the client
 */
const singleSignOn = async ({ email, name, ssoVendor, ssoVendorId, }) => {
    // Check if sso vendor valid
    if (!['facebookId', 'appleId', 'googleId'].includes(ssoVendor)) {
        (0, error_1.MyError)(statusCode_1.Http.BadRequest, 'ssoVendor is not valid', 'REST');
    }
    // Check if user already exists to decide to register or login
    const user = await prisma_1.prisma.user.findFirst({
        where: { email, [ssoVendor]: ssoVendorId },
    });
    // if user found so it's already registered , just log the user in
    if (user === null || user === void 0 ? void 0 : user.id)
        return await getAuthedUser(user);
    //  if not found so we need to register this user
    const newUser = await prisma_1.prisma.user.create({
        // @ts-ignore
        data: { email, name, [ssoVendor]: ssoVendorId },
    });
    return await getAuthedUser(newUser);
};
// ==================================================================
/**
 * Register
 * create a regular user
 * with regular role and permissions
 */
const register = async ({ email, name, password, type = "USER", }) => {
    email = email.toLowerCase();
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            name,
            password: await (0, hashing_1.hash)(password),
            type
        }
    });
    const accessToken = generateJWTToken({
        payload: { id: user.id },
        secret: configs_1.configs.ACCESS_TOKEN_SECRET,
        expiresIn: configs_1.configs.JWT_ACCESS_TOKEN_EXPIRES,
    });
    const { password: _, ...result } = user;
    return { ...result, accessToken };
};
// ==============================================================
/**
 * Login
 * @param email
 * @param password
 * @returns Promise<{ user, accessToken, refreshToken }>
 */
const login = async ({ email, password, }) => {
    email = email.toLowerCase();
    const { password: hashedPassword, ...user } = await getUserByEmail(email);
    if (!hashedPassword)
        (0, error_1.MyError)(statusCode_1.Http.Conflict, 'Sorry your password is incorrect', 'REST');
    const isPasswordValid = await (0, hashing_1.verifyHash)(password, hashedPassword);
    if (!isPasswordValid)
        (0, error_1.MyError)(statusCode_1.Http.Unauthorized, 'Sorry email and password are incorrect', 'REST');
    return await getAuthedUser(user);
};
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
const me = async (req) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
        const payload = await (0, exports.verifyJWTToken)(req.headers.authorization.split(' ')[1], configs_1.configs.ACCESS_TOKEN_SECRET);
        return payload.id;
    }
    return null;
};
// ==============================================================
exports.authService = {
    singleSignOn,
    register,
    findUserById,
    login,
    // changePassword,
    // deactivateAccount,
    verifyJWTToken: exports.verifyJWTToken,
    me,
};
