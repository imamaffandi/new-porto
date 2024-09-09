import React from "react";
import { socialMedia } from "../constant/constant";
import { SectionWrapper } from "../HOC";
const Footer = () => {
  return (
    <footer className="relative h-screen text-dark">
      <p className="absolute inset-[10rem] text-accent helvetica text-5xl font-black">
        CONTACT
      </p>
      <table className="absolute border border-dark bottom-20 right-20 border-collapse">
        <thead>
          <th className="montserrat border-b border-dark text-md hover:text-accent font-bold">
            imamaffandi715@gmail.com
          </th>
        </thead>
        <tbody>
          <tr className="flex justify-between px-3">
            {socialMedia.map((social) => (
              <td
                href={social.link}
                key={social.name}
                className="cursor-none hover:scale-105 focus:scale-90"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-10 h-10"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </footer>
  );
};

export default SectionWrapper(Footer, "contact");
