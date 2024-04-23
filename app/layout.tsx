import type { Metadata } from "next";
import { Inter, Open_Sans, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

const sans = Open_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500",  "700", "900"] });

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
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      </head>
      <body className={`${sans.className} ${roboto.className} max-w-[100vw] overflow-x-hidden`}>
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}

// !w - screen!max - w - [100vw]!overflow - x - hidden h - [100svh] max - h - [100svh] min - h - [100svh] overflow - y - scroll