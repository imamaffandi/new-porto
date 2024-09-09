import React from "react";
import { ellipse } from "../assets/asset";
const services = [
  "Wireframes",
  "Prototyping",
  "Fully Responsive Build",
  "Interactions & Animations",
  "Performance",
  "Accessibility",
  "SEO",
  "Security",
];
const skills = ["React", "Framer Motion", "THREE.JS", "Tailwind", "Figma"];
const About = () => {
  return (
    <main className="relative">
      <div className="flex justify-center items-center gap-3 h-screen p-10">
        <div className="w-1/2 flex flex-col h-full bg-zinc-300">
          <p className="text-8xl text-dark px-3 font-black helvetica">
            About Me
          </p>
          <p className="text-md montserrat text-dark text-justify p-3 pt-1 py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            est reprehenderit voluptatibus harum magni eius? Amet tempora
            reiciendis aut, velit repellendus aliquid quasi facere molestias?
            Repudiandae, at ab? Porro cumque illo sint ipsam. Reprehenderit
            temporibus doloremque, harum mollitia, unde, voluptas possimus enim
            magni perferendis dolorum quis animi dignissimos facilis adipisci?{" "}
          </p>
          <a
            // href="/path/to/your/cv.pdf"
            // download="YourName_CV.pdf"
            className="cursor-none text-7xl helvetica text-dark text-justify p-1 mx-2 py-2 pt-7 border-b-2 border-dark"
            // onClick={(e) => {
            //   e.preventDefault();
            //   window.open("/path/to/your/cv.pdf", "_blank");
            // }}
          >
            CV
          </a>
          <a
            href="/"
            className="text-7xl cursor-none helvetica text-dark text-justify p-1 py-3 mx-2 border-b-2 border-dark"
          >
            Instagram
          </a>
        </div>
        <div className="w-1/2 text-center h-full flex flex-col gap-3 justify-center items-center">
          <div className=" h-1/2 w-full text-justify bg-stone-300 overflow-hidden">
            <p className="text-justify helvetica font-black text-5xl">
              {services.map((service, index) => (
                <React.Fragment key={service}>
                  {service}
                  {index !== services.length - 1 && (
                    <span className="inline-flex justify-center items-center mx-5 rounded-full bg-dark size-5"></span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="text-xl flex justify-center items-center h-1/2 w-full gap-2 ">
            <div className="h-full w-1/2 full bg-neutral-300 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1723662887372-b6f42b6ccd50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8"
                alt="my picture"
                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
              />
            </div>
            <div className="h-full w-1/2 full bg-gray-300 p-2 flex flex-col justify-center items-start">
              {skills.map((skill) => (
                <p
                  key={skill}
                  className="text-md font-semibold py-2 montserrat border-b-2 border-dark w-full text-dark text-justify"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" absolute w-72 h-80 bg-slate-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <div className="w-1/2 h-full  flex helvetica justify-center items-center">
          <p className="text-9xl font-black">3+</p>
        </div>
        <div className="w-1/2 h-full text-3xl  montserrat">
          <p>years</p>
          <p>of experience</p>
        </div>
      </div>
    </main>
  );
};

export default About;
