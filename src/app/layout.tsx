import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Builder",
  description:
    "tailor and manage your resumes with AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen relative bg-gradient-to-br from-pink-50 via-rose-100 to-fuchsia-200`}>
      
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-pink-300/30 backdrop-blur-md bg-white/10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
            
              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="rounded-lg px-4 py-2 text-rose-500 hover:text-white border border-rose-300/40 transition-all duration-300 font-medium bg-white/10 hover:bg-pink-400/10 shadow-inner"
                >
                  Home
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-4 py-2 text-fuchsia-500 hover:text-white border border-fuchsia-400/30 transition-all duration-300 font-medium bg-white/10 hover:bg-fuchsia-400/10 shadow-inner"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>

          
        </nav>

        {/* Main Content */}
        <main className="pt-20">{children}</main>
       
      </body>
    </html>
  );
}
