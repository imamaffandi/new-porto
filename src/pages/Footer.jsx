import React from "react";
import { socialMedia } from "../constant/constant";
import { SectionWrapper } from "../HOC";
// import StatueScene from "../components/3d/Statue";
const Footer = () => {
  return (
    <footer className="relative h-screen text-dark">
      <section className="absolute flex flex-col gap-10 right-10 top-1/3 z-30">
        <p className=" helvetica text-7xl font-black">CONTACT</p>
        <div className="flex justify-between px-3 ">
          {socialMedia.map((social) => (
            <a
              href={social.link}
              target="_blank"
              key={social.name}
              className="hoverable cursor-none uppercase hover:text-accent helvetica text-dark font-medium px-1"
            >
              {social.name}
            </a>
          ))}
        </div>
      </section>
      <div className="h-screen">{/* <StatueScene /> */}</div>
      <p className="hoverable text-white helvetica bottom-0 text-[5.5rem] absolute w-full mix-blend-difference text-center font-black uppercase">
        imamaffandi715@gmail.com
      </p>
    </footer>
  );
};

export default SectionWrapper(Footer, "contact");
