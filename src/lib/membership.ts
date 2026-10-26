import { tiers } from "@/data/membership";
import type { TierId } from "@/lib/types";

const order: TierId[] = ["associate", "member", "patron"];

export function getTier(id: TierId) {
  return tiers.find((tier) => tier.id === id) ?? tiers[0];
}

export function hasTier(userTier: TierId, requiredTier: TierId) {
  return order.indexOf(userTier) >= order.indexOf(requiredTier);
}
