import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components";
import { Home, Projects } from "./pages";

const App = () => {
  const location = useLocation();

  const pageTitles = {
    "/": "Home | Imam Affandi",
    "/projects": "Projects | Imam Affandi",
    "/about": "About | Imam Affandi",
  };

  useEffect(() => {
    const currentTitle = pageTitles[location.pathname] || "Imam Affandi";
    document.title = currentTitle;

    if (location.pathname !== "/projects") {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 700);
    }
  }, [location.pathname]);

  return (
    <div className='bg-light font-body'>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App