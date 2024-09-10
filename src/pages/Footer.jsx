import React from "react";
import { socialMedia } from "../constant/constant";
import { SectionWrapper } from "../HOC";
const Footer = () => {
  return (
    <footer className="relative h-screen text-dark">
      <p className="absolute inset-[10rem] text-accent helvetica text-5xl font-black">
        CONTACT
      </p>
      <main className="absolute top-[20rem] left-[5rem] helvetica text-8xl font-medium hover:text-accent">
        imamaffandi715@gmail.com
      </main>
      <section className="absolute bottom-20 right-20 border-collapse">
        <div className="flex justify-between px-3">
          {socialMedia.map((social) => (
            <a
              href={social.link}
              key={social.name}
              className="cursor-none uppercase hover:text-accent helvetica text-dark font-medium px-1"
            >
              {social.name}
            </a>
          ))}
        </div>
      </section>
    </footer>
  );
};

export default SectionWrapper(Footer, "contact");
