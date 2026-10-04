import Navbar from "@/components/elements/navbar";
import Footer from "@/components/elements/footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { body, display, mono } from "@/styles/fonts";

const metadata = {
  title: "Annava Wisha Sikoko - Full Stack Engineer",
  description:
    "Annava Wisha Sikoko is a full stack engineer and University of Indonesia Computer Science graduate building commerce platforms, payment flows and automation with NestJS, PostgreSQL, Next.js, React, Shopify and Python.",
  keywords:
    "Annava Wisha Sikoko, full stack engineer, software engineer, web developer, portfolio, TypeScript, NestJS, PostgreSQL, Next.js, React, Shopify, Python, payments, eSIM",
  author: "Annava Wisha Sikoko",
  ogTitle: "Annava Wisha Sikoko - Full Stack Engineer",
  ogDescription:
    "Full stack engineer working on commerce platforms, payments and automation. NestJS, PostgreSQL, Next.js, Shopify and Python.",
  ogUrl: "https://annavaws.github.io",
  ogImage: "https://annavaws.github.io/me.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Annava Wisha Sikoko - Full Stack Engineer",
  twitterDescription:
    "Full stack engineer building commerce platforms, payment flows and automation.",
  twitterImage: "https://annavaws.github.io/me.jpg",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-ink font-body text-fg`}
    >
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="theme-color" content="#070B14" />

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
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
