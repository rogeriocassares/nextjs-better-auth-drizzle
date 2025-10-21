import { getOrganizationBySlug } from "@/app/server/organizations"
import MembersTable from "@/components/members-table"

type Params = Promise<{slug: string}>

export default async function OrganizationPage({params}: {params: Params}) {
  const {slug} = await params 

  const organization = await getOrganizationBySlug(slug)

  return <div className="flex flex-col gap-4 max-w-3xl mx-auto py-10">
    <h1 className="text-2xl font-bold">{organization?.name}</h1>
    <MembersTable members={organization?.members || []}/>
  </div>
}

