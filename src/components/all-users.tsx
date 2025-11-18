"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import type { User } from "@/db/schema";
import { authClient } from "@/lib/auth-client";
import { addMember } from "@/server/members";
import { Button } from "./ui/button";

interface AllUsersProps {
  users: User[];
  organizationId: string;
}

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddMember = async (userId: string) => {
    try {
      setIsLoading(true);
      await addMember(organizationId, userId, "member");
      setIsLoading(false);
      toast.success("Member added to organization.");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add member to organization");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteAddMember = async (user: User) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.organization.inviteMember({
        email: user.email,
        role: "member", // required
        organizationId,
      });

      if (error) {
        toast.error(error.message);
        console.error(error);
        return;
      }
      setIsLoading(false);
      toast.success("Invitation sent to member");
      router.refresh();
    } catch (error) {
      toast.error("Failed to invite member to organization");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold">All Users</h2>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-row items-center justify-start gap-4"
          >
            {user.name}{" "}
            <Button
              onClick={() => handleAddMember(user.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `Add ${user.name} to organizaton`
              )}
            </Button>
            <Button
              onClick={() => handleInviteAddMember(user)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `Invite ${user.name} to organizaton`
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
