import {
  CalendarDays,
  CalendarRange,
  ClipboardList,
  Compass,
  CreditCard,
  LayoutDashboard,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface WorkspaceNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

export const memberNav: WorkspaceNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/billing", label: "Membership", icon: CreditCard },
];

export const exploreNav: WorkspaceNavItem[] = [
  { href: "/clubs", label: "Browse clubs", icon: Compass },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/services", label: "Services", icon: Sparkles },
];

export const adminNav: WorkspaceNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/applications", label: "Applications", icon: ClipboardList },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/events", label: "Events", icon: CalendarRange },
];
