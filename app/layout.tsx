import type { Metadata } from "next";
import { Red_Hat_Text } from "next/font/google";
import CartProvider from "./_context/cartContext";
import "./globals.css";

const redHatText = Red_Hat_Text({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Desserts' cart",
  description: "Practice page from frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={redHatText.className}>
          {children}
        </body>
      </CartProvider>
    </html>
  );
}
