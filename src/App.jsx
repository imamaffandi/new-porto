import { useEffect } from "react";
import { Loaders } from "./components";
import { Navbar, About, Home, Projects, Footer } from "./pages";
import { Cursor } from "./components";
import Lenis from "lenis";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-light">
        <Cursor />
        <Loaders />
        <Navbar />
        <Home />
        <About />
        <Projects />
        <Footer />
      </div>
    </>
  );
};

export default App;
