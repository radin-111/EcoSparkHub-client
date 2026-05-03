import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from "@/providers/QueryProviders";
import LenisProvider from "@/components/providers/LenisProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoSparkHub",
  description: "EcoSparkHub is a platform for eco-friendly ideas and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <PageTransitionProvider>
              <QueryProviders>{children}</QueryProviders>
              <Toaster/>
            </PageTransitionProvider>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
