import React from "react";
import { socialMedia } from "../constant/constant";
import { SectionWrapper } from "../HOC";
const Footer = () => {
  return (
    <footer className="relative h-screen text-dark">
      <p className="helvetica absolute bottom-0 text-[5.5rem] text-center font-black uppercase">
        imamaffandi715@gmail.com
      </p>
      <section className="absolute flex flex-col gap-10 right-10 top-1/3 ">
        <p className=" helvetica text-7xl font-black">CONTACT</p>
        <div className="flex justify-between px-3 ">
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
