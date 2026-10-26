import { EventsManager } from "@/components/admin/events-manager";
import { events } from "@/data/events";
import { PageTitle } from "@/components/ui/page-title";

export default function AdminEventsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        eyebrow="Events"
        title="The calendar, in draft and in print"
        description="Publish or pull back evenings. Drafts stay hidden from members until they are published."
      />
      <EventsManager initial={events} />
    </div>
  );
}
