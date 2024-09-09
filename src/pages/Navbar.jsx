import React from "react";
import { Link } from "react-scroll";
import { links } from "../constant/constant";
const Navbar = () => {
  return (
    <nav className="flex helvetica bg-transparent text-dark pt-2 justify-between items-start px-3 fixed top-0 left-0 right-0 z-50">
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.name} className=" hover:text-accent">
            <Link to={link.link} smooth={true} duration={500}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <p>Imam Affandi</p>
      </div>
      <div>
        <p>Developer | Designer | Freelancer</p>
        <p>
          Indonesia (
          {new Date().toLocaleTimeString("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
          })}
          )
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
