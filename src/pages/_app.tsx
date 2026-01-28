import Navbar from "@/components/elements/navbar";
import Footer from "@/components/elements/footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Transition from "@/components/elements/transition";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

const metadata = {
  title: "Annava Wisha Sikoko - Software Engineer",
  description:
    "Annava Wisha Sikoko is a Computer Science graduate from the University of Indonesia, specializing in Full Stack Development. Experienced in building scalable web applications using React, Next.js, Django, FastAPI, and Spring Boot.",
  keywords:
    "Annava Wisha Sikoko, software engineer, full stack developer, web developer, portfolio, JavaScript, TypeScript, React, Next.js, Django, FastAPI, Spring Boot, Python, Java",
  author: "Annava Wisha Sikoko",
  ogTitle: "Annava Wisha Sikoko - Software Engineer",
  ogDescription:
    "Computer Science graduate from University of Indonesia. Full Stack Developer specializing in React, Next.js, Django, and Spring Boot.",
  ogUrl: "https://annavaws.github.io",
  ogImage: "https://annavaws.github.io/me.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Annava Wisha Sikoko - Software Engineer",
  twitterDescription:
    "Computer Science graduate & Full Stack Developer. Building scalable web applications with modern technologies.",
  twitterImage: "https://annavaws.github.io/me.jpg",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />

        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta property="og:image" content={metadata.ogImage} />

        <meta name="twitter:card" content={metadata.twitterCard} />
        <meta name="twitter:title" content={metadata.twitterTitle} />
        <meta
          name="twitter:description"
          content={metadata.twitterDescription}
        />
        <meta name="twitter:image" content={metadata.twitterImage} />

        <link rel="canonical" href="https://annavaws.github.io" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Navbar />
      <AnimatePresence mode="wait">
        <Transition>
          <Component {...pageProps} />
        </Transition>
        <Footer />
      </AnimatePresence>
    </div>
  );
}
