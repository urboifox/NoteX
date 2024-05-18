import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Providers from "@/providers";
import { cookies } from "next/headers";
import { getUser } from "@/functions/users";
import IslamicAzkar from "@/components/layout/IslamicAzkar";

const main = Inter({ subsets: ["latin"], variable: "--font-main" });
const number = Roboto_Mono({ subsets: ["latin"], variable: "--font-number" });

export const metadata: Metadata = {
  title: "NoteX | Focus on what matters",
  description: "Take care of your notes, articles and more, in one place.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={`${main.variable} ${number.variable}`}>
        <Providers user={JSON.parse(JSON.stringify(user))}>
          <Navbar />
          <IslamicAzkar visible={user?.islamicAzkar} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
