import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Craneo Candente | Estudio y Salas",
  description: "Prototipo de reservas online para Craneo Candente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
