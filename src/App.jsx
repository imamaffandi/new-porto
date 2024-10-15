import React from "react";
import { Loaders } from "./components";
import { Navbar, About, Home, Projects, Footer } from "./pages";
import { Cursor } from "./components";
// import StatueScene from "./components/3d/Statue";

const App = () => {
  return (
    <>
      {/* <StatueScene /> */}
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
