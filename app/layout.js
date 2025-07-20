import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'animate.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arkjun & Kiaa",
  description: "Arkjun & Kiaa Wedding Invitation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{scrollBehavior: 'smooth'}}>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
