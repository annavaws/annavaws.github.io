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
    "Portfolio of Annava Wisha Sikoko, a third-year Computer Science student at the University of Indonesia, is deeply passionate about Software Engineering. She’s dedicated to expanding her expertise, actively engaging in learning and applying her skills in both Front End and Back End Development.",
  keywords:
    "Annava Wisha Sikoko, software engineer, web developer, portfolio, JavaScript, TypeScript, React, Next.js, Django, FastAPI, Python, Java",
  author: "Annava Wisha Sikoko",
  ogTitle: "Annava Wisha Sikoko - Software Engineer",
  ogDescription:
    "Welcome to the portfolio of Annava Wisha Sikoko, showcasing expertise in software engineering and web development.",
  ogUrl: "https://annavaws.com",
  ogImage: "https://annavaws.com/_next/image?url=%2Fme.jpg&w=2048&q=75",
  twitterCard: "Annava",
  twitterTitle: "Annava Wisha Sikoko - Software Engineer",
  twitterDescription:
    "Explore the portfolio of Annava Wisha Sikoko, a wannabe software engineer.",
  twitterImage: "https://annavaws.com/_next/image?url=%2Fme.jpg&w=2048&q=75",
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

        <link rel="canonical" href="https://annavaws.com" />
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
