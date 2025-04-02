import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/Footer";

const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
   weight: ['200','300','400','500','600','700','800','900'],
});



export const metadata: Metadata = {
  title: "Summafy",
  description: "Turn documents into structured knowledge with Summafy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} font-sans antialiased`}
      >
        <div className={"relative flex min-h-screen flex-col"}>
            <Header/>
            <main className={"flex-1"}>
                {children}
            </main>
            <Footer/>
        </div>
      </body>
    </html>
  );
}
