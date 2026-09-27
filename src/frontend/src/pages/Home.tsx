import { About } from "@/components/sections/About";
import { Branches } from "@/components/sections/Branches";
import { Contact } from "@/components/sections/Contact";
import { GenreMarquee } from "@/components/sections/GenreMarquee";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";

export function Home() {
  return (
    <>
      <Hero />
      <GenreMarquee />
      <Services />
      <Branches />
      <Stats />
      <Portfolio />
      <About />
      <Contact />
    </>
  );
}
