import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BSC Incinerator | Burn Tokens, Mint NFTs",
  description: "Burn unwanted BSC tokens and mint unique pixel art Chinese character NFTs",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "BSC Incinerator | Burn Tokens, Mint NFTs",
    description: "Burn unwanted BSC tokens and mint unique pixel art Chinese character NFTs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BSC Incinerator",
    description: "Burn unwanted BSC tokens and mint unique pixel art Chinese character NFTs",
    creator: "@BSCincinerator",
  },
};

// Force dynamic rendering to avoid SSG issues with Web3Modal
export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

