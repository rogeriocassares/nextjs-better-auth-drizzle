"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { authClient } from "@/lib/auth-client";
import { Organization } from '@/db/schema';
import { toast } from "sonner";

interface organizationSwitcherProps {
  organizations: Organization[]
}

export function OrganizationSwitcher({ organizations, }: organizationSwitcherProps) {
  const { data: activeOrganization } = authClient.useActiveOrganization()

  const handleChangeOrganization = async (organizationId: string) => {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId,
      });

      if (error) {
        toast.error("Failed to switch organization.")
        return
      }
      toast.success("Organization switched successfully")
    } catch (error) {
      toast.error("Failed to switch organization.")
    }
  }
  return (
    <Select onValueChange={handleChangeOrganization} value={activeOrganization?.id}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {
          organizations.map((organization) => (
            <SelectItem key={organization.id} value={organization.id}>
              {organization.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}
