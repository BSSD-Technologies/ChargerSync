import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import Providers from "./providers";
import Navbar from "./_components/navbar/Navbar";
import "@/style/globals.css";

/* Define Inter font */
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

/* Define metadata for Charger Sync webpage */
export const metadata: Metadata = {
  title: "Charger Sync",
  description: "",
  icons: [{ rel: "icon", url: "/icon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        <Providers>
          <CssBaseline />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
