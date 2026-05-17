import { Instrument_Serif, Inter, Geist_Mono } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
