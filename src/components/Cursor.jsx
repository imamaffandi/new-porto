import React from "react";
import { gsap } from "gsap";

class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseX: 0,
      mouseY: 0,
      trailingX: 0,
      trailingY: 0,
      isHovered: false,
    };
    this.cursor = React.createRef();
    this.cursorTrailing = React.createRef();
    this.animationFrame = null;
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseover", this.onMouseOver);
    document.addEventListener("mouseout", this.onMouseOut);
    this.moveCursor();
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseover", this.onMouseOver);
    document.removeEventListener("mouseout", this.onMouseOut);
    cancelAnimationFrame(this.animationFrame);
  }

  onMouseMove = (evt) => {
    const { clientX, clientY } = evt;
    this.setState({
      mouseX: clientX,
      mouseY: clientY,
    });
  };

  onMouseOver = (evt) => {
    if (evt.target.classList.contains("hoverable")) {
      this.setState({ isHovered: true });
    } else if (evt.target.classList.contains("scale-cursor")) {
      this.setState({ isHovered: true });
    }
  };

  onMouseOut = (evt) => {
    if (
      evt.target.classList.contains("hoverable") ||
      evt.target.classList.contains("scale-cursor")
    ) {
      this.setState({ isHovered: false });
    }
  };

  moveCursor = () => {
    const { mouseX, mouseY, trailingX, trailingY, isHovered } = this.state;
    const diffX = mouseX - trailingX;
    const diffY = mouseY - trailingY;
    this.setState(
      {
        trailingX: trailingX + diffX / 10,
        trailingY: trailingY + diffY / 10,
      },
      () => {
        const scale = isHovered ? 3 : 1;
        const cursorScale = isHovered ? 1.5 : 1;

        // Use GSAP for animations
        gsap.to(this.cursor.current, {
          x: mouseX,
          y: mouseY,
          scale: cursorScale,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(this.cursorTrailing.current, {
          x: trailingX,
          y: trailingY,
          scale: scale,
          duration: 1,
          ease: "power2.out",
        });

        this.animationFrame = requestAnimationFrame(this.moveCursor);
      }
    );
  };

  render = () => {
    return (
      <div className="cursors">
        <div className="cursor" ref={this.cursor} />
        <div className="cursor" ref={this.cursorTrailing} />
      </div>
    );
  };
}
export default Cursor;
