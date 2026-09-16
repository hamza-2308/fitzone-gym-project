import "./globals.css";
import { Anton, Inter } from "next/font/google";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "FitZone | Train With Purpose",
  description:
    "FitZone is a modern gym offering personal training, strength & cardio equipment, membership packages and online booking.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}