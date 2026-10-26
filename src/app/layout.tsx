import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import { AppProvider } from "@/components/providers/app-provider";
import { SiteChrome } from "@/components/site/site-chrome";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Commune | Members' clubs for the city",
    template: "%s | Maison Commune",
  },
  description:
    "Maison Commune is a members' house of small clubs for readers, cooks, musicians, swimmers and late-night card players in Toronto, Montréal and Vancouver.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // suppressHydrationWarning: browser translation and extensions add attributes to <html> and <body>.
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <AppProvider>
          <SiteChrome>{children}</SiteChrome>
        </AppProvider>
      </body>
    </html>
  );
}
