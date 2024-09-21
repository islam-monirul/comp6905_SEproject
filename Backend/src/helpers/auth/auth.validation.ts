import { z } from 'zod'

// =================================================================

export const authValidation = {
  // ------------------------------

  singleSignOn: z.object({
    email: z.string(),
    name: z.string(),
    ssoVendor: z.enum(['googleId', 'facebookId', 'appleId']),
    ssoVendorId: z.string(),
    picture: z.string().optional(),
  }),

  // ------------------------------

  register: z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
  }),

  // ------------------------------

  isUserEmailFound: z.object({
    email: z.string().email(),
  }),

  // ------------------------------

  login: z.object({
    email: z.string().email(),
    password: z.string(),
  }),

  // ------------------------------

  forgetPassword: z.object({
    email: z.string().email(),
  }),

  // ------------------------------

  retrievePassword: z.object({
    otp: z.string().length(6),
    email: z.string().email(),
    password: z.string(),
  }),

  changePassword: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),

  verifyEmail: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),

  resendOtp: z.object({
    email: z.string().email(),
  }),

  // ----------------------------------

  confirmOtp: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),

  // -------------------------------------

  // deactivateAccount: z.object({
  //   email: z.string().email(),
  // }),

  // -------------------------------------

  updateUserPermissions: z.object({}),

  // -------------------------------------

  me: z.object({ userId: z.number().optional() }),

  // -------------------------------------

  authedUsedResponse: z.object({
    user: z.any(),
    accessToken: z.string(),
    refreshToken: z.string(),
  }),

  // ------------------------------
}
