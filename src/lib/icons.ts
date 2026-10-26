import {
  Feather,
  Flame,
  Palette,
  Telescope,
  Trophy,
  Utensils,
  Briefcase,
  Coffee,
  Bike,
  Dumbbell,
  BookOpen,
  Wine,
  Music,
  Waves,
  Mountain,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { ClubCategory, IconKey } from "@/lib/types";

const icons: Record<IconKey, LucideIcon> = {
  book: BookOpen,
  wine: Wine,
  music: Music,
  waves: Waves,
  mountain: Mountain,
  trophy: Trophy,
  utensils: Utensils,
  briefcase: Briefcase,
  coffee: Coffee,
  feather: Feather,
  telescope: Telescope,
  dumbbell: Dumbbell,
  bike: Bike,
  flame: Flame,
  palette: Palette,
  sprout: Sprout,
};

/** Module-level lookup so components can render `categoryIcons[category]` without creating components mid-render. */
export const categoryIcons: Record<ClubCategory, LucideIcon> = {
  "Arts & Letters": icons.book,
  "Food & Wine": icons.wine,
  Music: icons.music,
  Wellness: icons.waves,
  Outdoors: icons.mountain,
  Games: icons.trophy,
};

export function getIcon(key: IconKey): LucideIcon {
  return icons[key];
}

export function getCategoryIcon(category: ClubCategory): LucideIcon {
  return categoryIcons[category];
}
