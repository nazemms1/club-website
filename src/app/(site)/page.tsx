import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Manifesto } from "@/components/landing/manifesto";
import { Rooms } from "@/components/landing/rooms";
import { Tonight } from "@/components/landing/tonight";
import { MembershipShowcase } from "@/components/landing/membership-showcase";
import { Guestbook } from "@/components/landing/guestbook";
import { FinalCta } from "@/components/landing/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Rooms />
      <Tonight />
      <MembershipShowcase />
      <Guestbook />
      <FinalCta />
    </>
  );
}
