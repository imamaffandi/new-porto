import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components";
import { About, Projects, Contact, Admin } from "./pages";

const App = () => {
  const location = useLocation();

  const pageTitles = {
    "/": "About | Imam Affandi",
    "/projects": "Projects | Imam Affandi",
    "/contact": "Contact | Imam Affandi",
    "/admin": "Admin | You dont belong here",
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

  if (location.pathname === '/admin') {
    return <Admin />;
  }
  return (
    <div className='bg-light font-body'>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route index element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App
