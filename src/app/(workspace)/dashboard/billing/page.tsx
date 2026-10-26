import { BillingPanel } from "@/components/dashboard/billing-panel";
import { PageTitle } from "@/components/ui/page-title";

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        eyebrow="Membership"
        title="Your plan, at your pace"
        description="Change tiers at any time. Upgrades apply straight away; downgrades wait for your next billing date."
      />
      <BillingPanel />
    </div>
  );
}
