"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
// =================================================================
exports.authValidation = {
    // ------------------------------
    singleSignOn: zod_1.z.object({
        email: zod_1.z.string(),
        name: zod_1.z.string(),
        ssoVendor: zod_1.z.enum(['googleId', 'facebookId', 'appleId']),
        ssoVendorId: zod_1.z.string(),
        picture: zod_1.z.string().optional(),
    }),
    // ------------------------------
    register: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
    // ------------------------------
    isUserEmailFound: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
    // ------------------------------
    login: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
    // ------------------------------
    forgetPassword: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
    // ------------------------------
    retrievePassword: zod_1.z.object({
        otp: zod_1.z.string().length(6),
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
    changePassword: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
    verifyEmail: zod_1.z.object({
        email: zod_1.z.string().email(),
        otp: zod_1.z.string().length(6),
    }),
    resendOtp: zod_1.z.object({
        email: zod_1.z.string().email(),
    }),
    // ----------------------------------
    confirmOtp: zod_1.z.object({
        email: zod_1.z.string().email(),
        otp: zod_1.z.string().length(6),
    }),
    // -------------------------------------
    // deactivateAccount: z.object({
    //   email: z.string().email(),
    // }),
    // -------------------------------------
    updateUserPermissions: zod_1.z.object({}),
    // -------------------------------------
    me: zod_1.z.object({ userId: zod_1.z.number().optional() }),
    // -------------------------------------
    authedUsedResponse: zod_1.z.object({
        user: zod_1.z.any(),
        accessToken: zod_1.z.string(),
        refreshToken: zod_1.z.string(),
    }),
    // ------------------------------
};
