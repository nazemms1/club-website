import type { Metadata } from "next";
import { Suspense } from "react";
import { clubs } from "@/data/clubs";
import { ClubsDirectory } from "@/components/clubs/clubs-directory";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Clubs",
  description: "Browse every club in the house by category and city.",
};

export default function ClubsPage() {
  return (
    <>
      <PageHero
        eyebrow="The clubs"
        title={
          <>
            Eight rooms. <em className="text-forest italic">Find yours.</em>
          </>
        }
        description="Each club has its own host, schedule and house rule. Filter by what you love, or by the city you live in."
        art={{ palette: clubs[2].palette, motif: "sun" }}
      />
      <section className="pb-32">
        <Container>
          <Suspense fallback={<p className="text-ink-soft">Loading clubs</p>}>
            <ClubsDirectory />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
