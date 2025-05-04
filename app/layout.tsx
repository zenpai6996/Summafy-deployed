import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import {Footer} from "@/components/common/Footer";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "sonner";
import Aurora from "@/components/common/Aurora";


const fontSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
   weight: ['200','300','400','500','600','700','800','900'],
});



export const metadata: Metadata = {
  title: "Summafy",
  description: "Turn documents into structured knowledge with Summafy!",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={{

            variables: {
                colorPrimary: '#8F87F1'
            },
            elements: {
                userButtonPopoverFooter: {
                    display: 'none'
                }

            }
        }}
    >
        <html lang="en" style={{scrollBehavior:'smooth'}}>
        <body
            className={`${fontSans.variable} bg-neutral-950 font-sans antialiased`}
        >
         
        <div className={"  relative flex min-h-screen flex-col"}>
        <Aurora
                    colorStops={["#FF94B4", "#3A29FF", "#FF94B4"]}
                    blend={0.5}
                    amplitude={typeof window !== 'undefined' ? 
                      (window.innerWidth < 768 ? 0.3 : 1.3) : 
                      1.3
                    }
                    speed={0.4}
                    className="fixed inset-0 -z-10 aurora-amplitude "
                  />
            <Header className="relative z-10"/>
            <main className={"flex-1 relative z-0"}>
                {children}
            </main>
            <Footer/>
        </div>
        <Toaster richColors closeButton={false} position={"top-right"}/>
        </body>
        </html>
    </ClerkProvider>
  );
}
