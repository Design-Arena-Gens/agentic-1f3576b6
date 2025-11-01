import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alfox.ai Agentic Studio",
  description:
    "Launch AI calling agents, automation, and full-spectrum product teams with Alfox.ai. Book a strategy session in under 24 hours.",
  keywords: [
    "Alfox.ai",
    "AI Calling Agent",
    "Automation",
    "AI development",
    "Agentic operations",
    "Full stack product studio",
  ],
  openGraph: {
    title: "Alfox.ai — Agentic acceleration for AI-driven enterprises",
    description:
      "We ship AI agents, intelligent products, and automation programs that convert leads into revenue. Request your roadmap today.",
    url: "https://agentic-1f3576b6.vercel.app",
    siteName: "Alfox.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfox.ai — Agentic acceleration for AI-driven enterprises",
    description:
      "Deploy intelligent voice agents, automation, and digital experiences with a unified venture studio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
