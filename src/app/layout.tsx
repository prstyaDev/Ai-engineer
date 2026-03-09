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
  title: "prstyaDev | AI Engineer & Fullstack Developer",
  description:
    "Portfolio of an AI Engineer specializing in machine learning, LLM integration, and intelligent applications.",
  keywords: ["AI Engineer", "Fullstack Developer", "Machine Learning", "LLM", "Portfolio"],
  authors: [{ name: "AI Engineer" }],
  openGraph: {
    title: "prstyaDev Portfolio",
    description: "Building intelligent applications with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
