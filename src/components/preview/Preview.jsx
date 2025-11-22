import React,
{ useState, useEffect } from "react";
import { previewProject } from "../../utils/constant";
import { tick } from "../../assets";

const defaultPreviewImg = previewProject[0];
const buffer = 74;

const Preview = () => {
  const [previewImg, setPreviewImg] = useState(defaultPreviewImg);

  useEffect(() => {
    const tickSound = new Audio(tick);
    const handleScroll = () => {
      const position = window.scrollY;
      const index = Math.floor(position / buffer) % previewProject.length;
      const selectedPreviewImg = previewProject[index];
      if (selectedPreviewImg === previewImg) {
        return;
      }
      setPreviewImg(selectedPreviewImg);
      tickSound.play();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [previewImg]);

  return (
    <a href={previewImg.link} className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[35%] md:w-[35%] md:h-[40%] rounded-lg overflow-hidden opacity-75 md:opacity-100 -z-10 md:z-50">
      <img src={previewImg.img} alt="currently selected source" />
    </a>
  );
};

export default Preview;
