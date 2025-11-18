"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const isAdmin = async () => {
  try {
    const { success, error } = await auth.api.hasPermission({
      headers: await headers(),
      body: {
        permissions: {
          organization: ["update", "delete"],
        },
      },
    });

    console.log(`### success: ${success}`);
    console.log(`### error: ${error}`);

    if (error) {
      return {
        success: false,
        error: error || "Failed to check permissions.",
      };
    }
    return success;
  } catch (error) {
    console.log(`error: ${error}`);

    console.error(error);
    return {
      success: false,
      error: error || "Failed to check permissions.",
    };
  }
};
