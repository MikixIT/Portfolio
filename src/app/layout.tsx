import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Created with Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          rubik.variable,
          "bg-gray-900 text-white antialiased font-sans"
        )}
      >
        {children}
      </body>
    </html>
  );
}
