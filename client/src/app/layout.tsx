import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Footer, Navbar } from "@/components";
import { Suspense } from "react";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BitRaise | CrowdFunding in Crypto",
  description: "CryptoPledge Support That Grows | Crypto makes it quick. You make it possible!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextUIProvider>
          <Providers>
            <div className="bg-bg">
              <Navbar />
              <div className="mx-auto max-w-6xl py-4 px-6 min-h-screen bg-transparent">
                <Suspense
                  fallback={
                    <div className="h-screen flex flex-col justify-center items-center gap-2">
                      <Spinner color="primary" />
                      <p className="font-bold">Loading...</p>
                      <p>Please Wait</p>
                    </div>
                  }
                >
                  <div className="mt-24 w-full h-full">{children}</div>
                </Suspense>
              </div>
              <Footer />
              <ToastContainer position="top-right" />
            </div>
          </Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
