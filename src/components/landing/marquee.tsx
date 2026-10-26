import { Fragment } from "react";

const phrases = [
  "Literary Salon",
  "Blind Tastings",
  "Sunday Strings",
  "Sauna and Soup",
  "Sunrise Summits",
  "Late Table",
  "Supper for Twelve",
  "Life Drawing",
];

export function Marquee() {
  // Duplicated once so the -50% loop is seamless.
  const loop = [...phrases, ...phrases];

  return (
    <section aria-label="Club names" className="overflow-hidden bg-forest py-7 text-paper">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {loop.map((phrase, index) => (
          <Fragment key={`${phrase}-${index}`}>
            <span className="font-display text-4xl italic md:text-5xl">{phrase}</span>
            <span aria-hidden="true" className="size-2.5 rounded-full bg-brass" />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
