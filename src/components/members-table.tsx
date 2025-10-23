
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Member } from "@/db/schema"
import { Button } from "./ui/button"
import MembersTableAction from "./members-table-actions"

interface MemberTableProps {
  members: Member[]
}

export default function MembersTable({members}: MemberTableProps) {
  return(
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Username</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {members.map((member) => (
    <TableRow key={member.id}>
      <TableCell className="font-medium">{member.user.name}</TableCell>
      <TableCell>{member.user.email}</TableCell>
      <TableCell>{member.role}</TableCell>
      <TableCell className="text-right">
        <MembersTableAction memberId={member.id} />
      </TableCell>
    </TableRow>
    ))}
  </TableBody>
</Table>
  )
}