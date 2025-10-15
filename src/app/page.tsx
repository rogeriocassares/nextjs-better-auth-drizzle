import Image from "next/image";
import { signIn, signUp } from "./server/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "./signOut";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <button onClick={signIn}>Sign In</button>
      <button onClick={signUp}>Sign Up</button>
      <SignOut />
      <p>{!session ? "Not authenticated" : session.user.name}</p>
    </main>
  );
}
