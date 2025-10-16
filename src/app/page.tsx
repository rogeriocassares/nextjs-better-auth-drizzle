
import { signIn, signUp } from "@/app/server/users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOut from "./signOut";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <Button variant="outline" onClick={signIn} >Sign In</Button>
      <Button variant="outline" onClick={signUp}>Sign Up</Button>
      <SignOut />
      <p>{!session ? "Not authenticated" : session.user.name}</p>
    </main>
  );
}
