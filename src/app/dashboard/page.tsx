import { CreateOrganizationForm } from "@/components/forms/create-organization-form";
import { Logout } from "@/components/logout";
import { Button } from "@/components/ui/button";
import { organization } from '../../db/schema';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default async function Page() {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
   
      <Logout />

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Organization</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
            Create a new organization to get started.
            </DialogDescription>
          </DialogHeader>
          <CreateOrganizationForm/>
        </DialogContent>
      </Dialog>

    </div>)
}
