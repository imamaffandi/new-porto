import React,
{ useState, useEffect } from "react";
import { previewImgs } from "../../constant";

const defaultPreviewImg = previewImgs[0];
const buffer = 100;

const Preview = () => {
  const [previewImg, setPreviewImg] = useState(defaultPreviewImg);

  useEffect(() => {

    const handleScroll = () => {
      const position = window.scrollY;
      const index = Math.floor(position / buffer) % previewImgs.length;
      const selectedPreviewImg = previewImgs[index];
      if (selectedPreviewImg === previewImg) {
        return;
      }
      setPreviewImg(selectedPreviewImg);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [previewImg]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75%] h-[35%] md:w-[35%] md:h-[40%] rounded-lg overflow-hidden opacity-75 md:opacity-100 -z-10 md:z-50">
      <img src={previewImg} alt="currently selected source" />
    </div>
  );
};

export default Preview;
