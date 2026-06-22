import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});
const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intraform, Pinerolo TO",
  description: "Associazione Intraform è un ente formativo nato con l’intento di costituire un punto di riferimento per il territorio piemontese nell’ambito della formazione continua e aziendale e teso all’elaborazione di progetti e programmi a livello nazionale, comunitario e internazionale per il coinvolgimento delle aziende locali e nazionali.",

  //Inserire una descrizione per intraform
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="notranslate" translate="no" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${inter.variable} ${sora.variable} font-arimo max-w-[100vw] overflow-x-hidden`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}

// !w - screen!max - w - [100vw]!overflow - x - hidden h - [100svh] max - h - [100svh] min - h - [100svh] overflow - y - scroll