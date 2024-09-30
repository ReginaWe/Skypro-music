import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skypro music - Category",
  description: "Слушай до дыр",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}