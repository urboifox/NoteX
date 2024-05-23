import Navbar from "@/components/common/Navbar";
import IslamicAzkar from "@/components/layout/IslamicAzkar";
import { getUser } from "@/functions/users";
import Providers from "@/providers";
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";

const main = Inter({ subsets: ["latin"], variable: "--font-main" });
const number = Roboto_Mono({ subsets: ["latin"], variable: "--font-number" });

export const metadata: Metadata = {
  title: "NoteX | Focus on what matters",
  description: "Take care of your Notes, Todos and more, in one place.",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const session = cookies().get('session')?.value;

  return (
      <html lang="en">
          <body className={`${main.variable} ${number.variable}`}>
              <Providers user={JSON.parse(JSON.stringify(user))}>
                  <Navbar session={session as string} />
                  {user?.islamic && (
                      <IslamicAzkar visible={user?.islamicAzkar} />
                  )}
                  {children}
              </Providers>
          </body>
      </html>
  );
}
