import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle"; // your drizzle instance
import { schema } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";
import VerifyEmail from "@/components/emails/verify-email";
import { organization } from "better-auth/plugins"
import { getActiveOrganization } from "@/app/server/organizations";


const resend = new Resend(process.env.RSEND_API_KEY as string);

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        //from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email address",
        react: VerifyEmail({ username: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true,
  },
 
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({
          username: user.name,
          resetUrl: url,
          userEmail: user.email,
        }),
      });
    },
    requireEmailVerification: true,
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const organization = await getActiveOrganization(session.userId);
          return {
            data: {
              ...session,
              activeOrganizationId: organization?.id,
            },
          };
        },
      },
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema,
  }),
  plugins: [organization(), nextCookies()],
});
