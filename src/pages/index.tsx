import About from "@/components/modules/about";
import Header from "@/components/modules/header";
export default function Home() {
  return (
    <>
      <div className="relative z-10">
        <Header />
        <About />
      </div>
    </>
  );
}
