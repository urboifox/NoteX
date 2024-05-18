import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Providers from "@/providers";
import { cookies } from "next/headers";

const main = Inter({ subsets: ["latin"], variable: "--font-main" });
const number = Roboto_Mono({ subsets: ["latin"], variable: "--font-number" });

export const metadata: Metadata = {
  title: "NoteX | Focus on what matters",
  description: "Take care of your notes, articles and more, in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get('session')?.value;
  return (
    <html lang="en">
      <body className={`${main.variable} ${number.variable}`}>
        <Providers session={session as string}>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
