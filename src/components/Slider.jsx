import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import "./slider.module.css";
gsap.registerPlugin(CustomEase);

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollAllowed, setScrollAllowed] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isTouchActive, setIsTouchActive] = useState(false);

  const sliderRef = useRef(null);
  const mainImageContainerRef = useRef(null);
  const titleContainerRef = useRef(null);
  const descriptionContainerRef = useRef(null);
  const counterContainerRef = useRef(null);

  const totalSlides = 7;
  const slideTitles = [
    "Field Unit",
    "Astral Convergence",
    "Eclipse Core",
    "Luminous",
    "Serenity",
    "Nebula Point",
    "Horizon",
  ];
  const slideDescriptions = [
    "Concept Art",
    "Soundscape",
    "Experimental Film",
    "Editorial",
    "Music Video",
    "VFX",
    "Set Design",
  ];

  const createSlide = (slideNumber, direction) => {
    const slide = document.createElement("div");
    slide.className = "slide";

    const slideBgImg = document.createElement("div");
    slideBgImg.className = "slide-bg-img";

    const img = document.createElement("img");
    img.src = { profile };
    img.alt = "";

    slideBgImg.appendChild(img);
    slide.appendChild(slideBgImg);

    slideBgImg.style.clipPath =
      direction === "down"
        ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

    return slide;
  };

  const createMainImageWrapper = (slideNumber, direction) => {
    const wrapper = document.createElement("div");
    wrapper.className = "slide-main-img-wrapper";

    const img = document.createElement("img");
    img.src = `./assets/img${slideNumber}.jpeg`;
    img.alt = "";

    wrapper.appendChild(img);

    wrapper.style.clipPath =
      direction === "down"
        ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
        : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

    return wrapper;
  };

  const createTextElements = (slideNumber, direction) => {
    const newTitle = document.createElement("h1");
    newTitle.textContent = slideTitles[slideNumber - 1];
    gsap.set(newTitle, { y: direction === "down" ? 50 : -50 });

    const newDescription = document.createElement("p");
    newDescription.textContent = slideDescriptions[slideNumber - 1];
    gsap.set(newDescription, { y: direction === "down" ? 20 : -20 });

    const newCounter = document.createElement("p");
    newCounter.textContent = slideNumber;
    gsap.set(newCounter, { y: direction === "down" ? 18 : -18 });

    return { newTitle, newDescription, newCounter };
  };

  const animateSlide = (direction) => {
    if (isAnimating || !scrollAllowed) return;

    setIsAnimating(true);
    setScrollAllowed(false);

    const slider = sliderRef.current;
    const currentSlideElement = slider.querySelector(".slide");
    const mainImageContainer = mainImageContainerRef.current;
    const currentMainWrapper = mainImageContainer.querySelector(
      ".slide-main-img-wrapper"
    );
    const titleContainer = titleContainerRef.current;
    const descriptionContainer = descriptionContainerRef.current;
    const counterContainer = counterContainerRef.current;

    const currentTitle = titleContainer.querySelector("h1");
    const currentDescription = descriptionContainer.querySelector("p");
    const currentCounter = counterContainer.querySelector("p");

    const newSlideNumber =
      direction === "down"
        ? currentSlide === totalSlides
          ? 1
          : currentSlide + 1
        : currentSlide === 1
        ? totalSlides
        : currentSlide - 1;

    const newSlide = createSlide(newSlideNumber, direction);
    const newMainWrapper = createMainImageWrapper(newSlideNumber, direction);
    const { newTitle, newDescription, newCounter } = createTextElements(
      newSlideNumber,
      direction
    );

    slider.appendChild(newSlide);
    mainImageContainer.appendChild(newMainWrapper);
    titleContainer.appendChild(newTitle);
    descriptionContainer.appendChild(newDescription);
    counterContainer.appendChild(newCounter);

    gsap.set(newMainWrapper.querySelector("img"), {
      y: direction === "down" ? "-50%" : "50%",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        [
          currentSlideElement,
          currentMainWrapper,
          currentTitle,
          currentDescription,
          currentCounter,
        ].forEach((el) => el?.remove());
        setIsAnimating(false);
        setCurrentSlide(newSlideNumber);
        setTimeout(() => setScrollAllowed(true), 100);
      },
    });

    tl.to(
      newSlide.querySelector(".slide-bg-img"),
      {
        clipPath:
          direction === "down"
            ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
            : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.25,
        ease: CustomEase.create("", ".87,0,.13,1"),
      },
      0
    )
      .to(
        currentSlideElement.querySelector("img"),
        { scale: 1.5, duration: 1.25 },
        0
      )
      .to(
        newMainWrapper,
        {
          clipPath:
            direction === "down"
              ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
              : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
          duration: 1.25,
        },
        0
      )
      .to(
        currentMainWrapper.querySelector("img"),
        { y: direction === "down" ? "50%" : "-50%", duration: 1.25 },
        0
      )
      .to(newMainWrapper.querySelector("img"), { y: "0%", duration: 1.25 }, 0)
      .to(
        currentTitle,
        { y: direction === "down" ? -50 : 50, duration: 1.25 },
        0
      )
      .to(newTitle, { y: 0, duration: 1.25 }, 0)
      .to(
        currentDescription,
        { y: direction === "down" ? -20 : 20, duration: 1.25 },
        0
      )
      .to(newDescription, { y: 0, duration: 1.25 }, 0)
      .to(
        currentCounter,
        { y: direction === "down" ? -18 : 18, duration: 1.25 },
        0
      )
      .to(newCounter, { y: 0, duration: 1.25 }, 0);
  };

  const handleScroll = (direction) => {
    const now = Date.now();
    if (isAnimating || !scrollAllowed || now - lastScrollTime < 1000) return;
    setLastScrollTime(now);
    animateSlide(direction);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      handleScroll(e.deltaY > 0 ? "down" : "up");
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
      setIsTouchActive(true);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (!isTouchActive || isAnimating || !scrollAllowed) return;
      const touchCurrentY = e.touches[0].clientY;
      const difference = touchStartY - touchCurrentY;
      if (Math.abs(difference) > 10) {
        setIsTouchActive(false);
        handleScroll(difference > 0 ? "down" : "up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", () => setIsTouchActive(false));

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", () => setIsTouchActive(false));
    };
  }, [isAnimating, scrollAllowed, lastScrollTime, isTouchActive, touchStartY]);

  return (
    <div className="slider" ref={sliderRef}>
      <div className="slide-main-img" ref={mainImageContainerRef}>
        <div className="slide-main-img-wrapper">
          {/* <img src={`./assets/img${currentSlide}.jpeg`} alt="" /> */}
          <img src={profile} alt="" />
        </div>
      </div>
      <div className="slide-title" ref={titleContainerRef}>
        <h1>{slideTitles[currentSlide - 1]}</h1>
      </div>
      <div className="slide-description" ref={descriptionContainerRef}>
        <p>{slideDescriptions[currentSlide - 1]}</p>
      </div>
      <div className="count" ref={counterContainerRef}>
        <p>{currentSlide}</p>
      </div>
    </div>
  );
};
export default Slider;
