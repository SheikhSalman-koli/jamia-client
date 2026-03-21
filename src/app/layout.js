import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "@/components/navbar1";
import NextAuthProvider from "@/providers/nextAuthProvider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "পূর্বাচল মাদরাসা",
  description: "মাদরাসা ছাত্র ভর্তি এবং একাডেমিক ম্যানেজমেন্ট সিস্টেম",
  icons: {
    icon: "https://res.cloudinary.com/dobtto17a/image/upload/v1773827388/madrasha-logo_nyskjk.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <NextAuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar1></Navbar1>
            <main className="">
              {children}
            </main>
          </ThemeProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
