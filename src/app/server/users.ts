"use server";

import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true, // returns a response object instead of data
  });
};

export const signUp = async () => {
  await auth.api.signUpEmail({
    body: {
      email: "user@example.com",
      password: "12345678",
      name: "Example User",
    },
    asResponse: true, // returns a response object instead of data
  });
};
