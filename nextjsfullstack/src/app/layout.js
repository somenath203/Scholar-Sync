import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { AuthProvider } from "./AuthProvider";
import Footer from "./_components/all_purpose_component/Footer";
import Navbar from "./_components/all_purpose_component/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Scholar Sync",
  description: "ScholarSync: Your personalized study roadmap and progress tracker, guiding you step-by-step to academic success.",
  icons: {
    icon: '/education_logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>

      <html lang="en" suppressHydrationWarning>

        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950`}>
          
          <Navbar />

          {children}

          <Footer />

          <Toaster />

        </body>
        
      </html>

    </AuthProvider>
  );
}