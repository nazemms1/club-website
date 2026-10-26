import { ProfileForm } from "@/components/dashboard/profile-form";
import { PageTitle } from "@/components/ui/page-title";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <PageTitle
        eyebrow="Profile"
        title="How the house knows you"
        description="Hosts see your name, city and short bio. Notification choices are yours to change at any time."
      />
      <ProfileForm />
    </div>
  );
}
