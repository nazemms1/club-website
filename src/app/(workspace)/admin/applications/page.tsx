import { ApplicationsQueue } from "@/components/admin/applications-queue";
import { applications } from "@/data/membership";
import { PageTitle } from "@/components/ui/page-title";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        eyebrow="Applications"
        title="Review the queue"
        description="Approve or decline applications. Decisions made here are kept in this browser only, since this is a prototype."
      />
      <ApplicationsQueue initial={applications} />
    </div>
  );
}
