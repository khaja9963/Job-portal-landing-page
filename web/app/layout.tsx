import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist, Playfair_Display, Newsreader, Courier_Prime } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"], style: ["normal", "italic"] });

const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });
const courier = Courier_Prime({ variable: "--font-courier", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Clyptus — AI hiring, end to end",
  description:
    "Post jobs, find candidates with AI, run AI video interviews and get scored reports. Hire in days, not months.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${geist.variable} ${serif.variable} ${newsreader.variable} ${courier.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
