import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CharSplit = ({ text, delay = 0, speed, className, duration }) => {
  const container = useRef();
  const letterRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "sine.inOut" },
      delay: delay,
    });

    letterRefs.current.forEach((letter, index) => {
      tl.fromTo(
        letter,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: index * speed,
        },
        index * 0.03
      );
    });

    return () => {
      tl.kill();
    };
  }, [text, delay]);

  const letters = text.split("").map((char, index) => {
    if (char === " ") {
      return (
        <span
          key={index}
          className="inline-block w-4"
          ref={(element) => (letterRefs.current[index] = element)}
        >
          &nbsp;
        </span>
      );
    }

    return (
      <span
        className="inline-block"
        ref={(element) => (letterRefs.current[index] = element)}
        key={index}
      >
        {char}
      </span>
    );
  });

  return (
    <div ref={container} className={className}>
      {letters}
    </div>
  );
};

export const WordSplit = ({ text, delay = 0, speed, className, duration }) => {
  const container = useRef();
  const letterRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: delay,
    });

    letterRefs.current.forEach((letter, index) => {
      tl.fromTo(
        letter,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: index * speed,
        },
        index * 0.03
      );
    });

    return () => {
      tl.kill();
    };
  }, [text, delay]);

  const words = text.split(/(\s+)/).map((word, index) => {
    if (/\s+/.test(word)) {
      return (
        <span
          key={index}
          className="inline-block w-4"
          ref={(element) => (letterRefs.current[index] = element)}
        >
          &nbsp;
        </span>
      );
    }

    return (
      <span
        className="inline-block"
        ref={(element) => (letterRefs.current[index] = element)}
        key={index}
      >
        {word}
      </span>
    );
  });

  return (
    <div ref={container} className={className}>
      {words}
    </div>
  );
};

export const LineSplit = ({ text, delay = 0, speed, className, duration }) => {
  const container = useRef();
  const letterRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      delay: delay,
    });

    letterRefs.current.forEach((letter, index) => {
      tl.fromTo(
        letter,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: duration,
          delay: index * speed,
        },
        index * 0.03
      );
    });

    return () => {
      tl.kill();
    };
  }, [text, delay]);

  const lines = text.split("\n").map((line, index) => (
    <div
      key={index}
      className="block"
      ref={(element) => (letterRefs.current[index] = element)}
    >
      {line}
    </div>
  ));

  return (
    <div ref={container} className={className}>
      {lines}
    </div>
  );
};
