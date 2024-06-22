import type { Metadata } from "next";
import { Inter, Raleway, Roboto, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Raleway({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LemmaUI",
  description: "Generate Appealing Interfaces using JSON",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        {children}
        </body>
    </html>
  );
}
