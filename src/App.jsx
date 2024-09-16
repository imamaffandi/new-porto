import React from "react";
import { Loaders } from "./components";
import { Navbar, About, Home, Projects, Footer } from "./pages";
import { Cursor } from "./components";

const App = () => {
  return (
    <div className="bg-light">
      <Cursor />
      <Loaders />
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Footer />
      {/* <Minesweeper /> */}
      {/* <Crow /> */}
    </div>
  );
};
export default App;
