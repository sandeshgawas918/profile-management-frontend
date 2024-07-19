import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Profile Management App",
  description: "Developed by Sandesh Gawas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='{inter.className} bg-slate-900 text-white'>{children}</body>
    </html>
  );
}
