import type { AppProps } from "next/app";
import { Barlow_Semi_Condensed, Bebas_Neue } from "next/font/google";

import "@/styles/globals.css";

const headlineFont = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-headline"
});

const bodyFont = Barlow_Semi_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${headlineFont.variable} ${bodyFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
