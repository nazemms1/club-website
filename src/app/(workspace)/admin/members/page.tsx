import { MembersTable } from "@/components/admin/members-table";
import { members } from "@/data/members";
import { PageTitle } from "@/components/ui/page-title";

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle eyebrow="Members" title="Everyone on the list" description="Search and filter every member across the three houses." />
      <MembersTable members={members} />
    </div>
  );
}
