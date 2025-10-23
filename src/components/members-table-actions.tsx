"use client"
import { removeMember } from "@/app/server/members";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface MemberTableActionProps {
  memberId: string
}

export default function MembersTableAction({memberId} : MemberTableActionProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRemoveMember = async () => {
    try {
      setIsLoading(true)
      const {success, error} = await removeMember(memberId)

      if (!success) {
        toast.error(error || "Failed to remove a member.")
        return
      }
     
      setIsLoading(false)
      toast.error("Member removed from organization.")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove member from organization.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Button onClick={handleRemoveMember} variant="destructive" size="sm" disabled={isLoading}>
      {isLoading ? (<Loader2 className="size-4 animate-spin"/>) : ("Remove")}
    </Button>
  )
}