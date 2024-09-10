import { instagram, github, linkedin, fiverr } from "../assets/asset";
import {
  gorify,
  blackhole,
  resto,
  portfolio,
  apiproject,
} from "../assets/projects/project";
const links = [
  {
    name: "Home",
    link: "home",
  },
  {
    name: "Projects",
    link: "projects",
  },
  {
    name: "Contact",
    link: "contact",
  },
];
const socialMedia = [
  {
    name: "Ig",
    icon: instagram,
    link: "https://www.instagram.com/imamaffandi715/",
  },
  {
    name: "Gh",
    icon: github,
    link: "https://www.github.com/imamaffandi715/",
  },
  {
    name: "Ln",
    icon: linkedin,
    link: "https://www.linkedin.com/in/imamaffandi715/",
  },
  {
    name: "Fr",
    icon: fiverr,
    link: "https://www.whatsapp.com/imamaffandi715/",
  },
];
const projects = [
  {
    index: 1,
    name: "Portfolio",
    image: portfolio,
    preview: "#",
    source: "https://github.com/imamaffandi/imamaffandi.git",
    description:
      "My web portfolio that includes animation, and 3d objects. You can also send me a message to work with me.",
  },
  {
    index: 2,
    name: "Movie API",
    image: apiproject,
    preview: "https://imamaffandi-api-project.netlify.app/",
    source: "https://github.com/imamaffandi/apiproject",
    description:
      "My web API project that i make with pure HTML, CSS, and javascript. I use The Movie Database API to make this project.",
  },
  {
    index: 3,
    name: "Phone Service",
    image: gorify,
    preview: "https://imamaffandi-gorifycell.netlify.app/",
    source: "https://github.com/imamaffandi/phonecell",
    description:
      "Website that i make with 3d objects using react fiber. I also use framer motion to animate content on the website.",
  },
  {
    index: 4,
    name: "Blackhole Explanation",
    image: blackhole,
    preview: "https://imamaffandi-blackhole-explained.netlify.app/",
    source: "https://github.com/imamaffandi/blackhole-explained.git",
    description:
      "Website that i make with 3d objects using THREE Js. I also use AOS to animate content on the website.",
  },
  {
    index: 5,
    name: "Restaurant Website",
    image: resto,
    preview: "https://imamaffandi-restaurant.netlify.app/",
    source: "https://github.com/imamaffandi/resto.git",
    description:
      "Website that i make with React JS, and framer motion. I also use react elastic carousel library to make this website.",
  },
];
export { links, socialMedia, projects };
