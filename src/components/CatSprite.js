import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CatSprite({ stream, globalactive, name, characters, width, height, position }) {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const ref_cat = useRef(null);
  const ref_angle = useRef(0);
  const ref_left = useRef(position.x);
  const ref_top = useRef(position.y);
  const ref_scale = useRef(1);
  const lastAnimation = useRef(null);

  const notify = (instruction) => {
    toast.warning(`Collision detected! Perform the opposite animation: ${instruction}`, {
      position: toast.POSITION.TOP_CENTER,
      className: "bg-red-500 text-white absolute ",
      bodyClassName: "text-lg",
      autoClose: 1000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    const element = ref_cat.current;

    if (!element) return;

    const checkCollision = () => {
      for (let character of characters) {
        if (character.name !== name) {
          const otherLeft = character.position.x;
          const otherTop = character.position.y;
          const otherWidth = character.width;
          const otherHeight = character.height;

          const rect1 = {
            left: ref_left.current,
            top: ref_top.current,
            right: ref_left.current + width,
            bottom: ref_top.current + height,
          };

          const rect2 = {
            left: otherLeft,
            top: otherTop,
            right: otherLeft + otherWidth,
            bottom: otherTop + otherHeight,
          };

          if (
            rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top
          ) {
            return { collided: true, character };
          }
        }
      }
      return { collided: false };
    };

    const resolveCollision = (collidedCharacter) => {
      const otherLeft = collidedCharacter.position.x;
      const otherTop = collidedCharacter.position.y;
    
      const deltaX = (ref_left.current + width / 2) - (otherLeft + collidedCharacter.width / 2);
      const deltaY = (ref_top.current + height / 2) - (otherTop + collidedCharacter.height / 2);
    
      console.log("Collision detected:", { deltaX, deltaY });
      console.log(ref_cat.current);
      let targetLeft = ref_left.current;
      let targetTop = ref_top.current;
      let targetLeftcolid = collidedCharacter.position.x;
      let targetTopcolide = collidedCharacter.position.y;

      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY < 0) {
          targetTop = otherTop - 1.5*height;
          targetLeftcolid=ref_top.current+1.5*collidedCharacter.height; 
           // Move up
          notify("Move Up");
        } else {
          targetTop = otherTop + 1.5*collidedCharacter.height; // Move down
          notify("Move Down");
        }
      } else {
        if (deltaX < 0) {
          targetLeft = otherLeft - 1.5*width; // Move left
          notify("Move Left");
        } else {
          targetLeft = otherLeft + 1.5*collidedCharacter.width; // Move right
          notify("Move Right");
        }
      }
    
      // Animate both X and Y positions
      Promise.all([
        animateMovement("left", ref_left.current, targetLeft),

        animateMovement("top", ref_top.current, targetTop),
        // animateMovement("top", collidedCharacter, targetLeftcolid),
      ]).then(() => {
        ref_left.current = targetLeft;
        ref_top.current = targetTop;
        // collidedCharacter.position.x=targetLeftcolid;
        // collidedCharacter.position.y=targetTopcolide;
        updateCharacterPosition(ref_left.current, ref_top.current);
        // updateCharacterPosition(collidedCharacter.position.x, collidedCharacter.position.y);
      });
    };

    const updateCharacterPosition = (newX, newY) => {
      const characterIndex = characters.findIndex(character => character.name === name);
      if (characterIndex !== -1) {
        characters[characterIndex].position.x = newX;
        characters[characterIndex].position.y = newY;
        console.log(`Updated position of ${name}: X: ${newX}, Y: ${newY}`);
      }
    };

    const handleCollision = () => {
      const { collided, character } = checkCollision();
      if (collided) {
        resolveCollision(character);
      }
    };

    const Animations = async () => {
      for (let key of stream || []) {
        const keyType = key.key;
        const keyValue = key.value;

        console.log(`Executing animation: ${keyType}, Value: ${keyValue}`);
        handleCollision(); // Check for collision before each animation step

        lastAnimation.current = { type: keyType, value: keyValue };

        switch (true) {
          case keyType.startsWith("movex"):
          case keyType.startsWith("movey"):
            await moveCharacter(keyType, keyValue);
            break;
          case keyType.startsWith("turnanti"):
          case keyType.startsWith("turnclock"):
            rotateCharacter(keyType, keyValue);
            break;
          case keyType.startsWith("jumptoX") || keyType.startsWith("gotoX"):
            ref_left.current = keyValue;
            element.style.left = `${keyValue}px`;
            updateCharacterPosition(ref_left.current, ref_top.current);
            break;
          case keyType.startsWith("jumptoY") || keyType.startsWith("gotoY"):
            ref_top.current = keyValue;
            element.style.top = `${keyValue}px`;
            updateCharacterPosition(ref_left.current, ref_top.current);
            break;
          case keyType.startsWith("rotatedegree"):
            rotateDegree(keyValue);
            break;
          case keyType.startsWith("changesize"):
          case keyType.startsWith("setsize"):
            changeSize(keyType, keyValue);
            break;
          case keyType.startsWith("wait"):
            await wait(keyValue);
            break;
          case keyType.startsWith("speak"):
            await speak(keyValue);
            break;
          case keyType.startsWith("changeColorEffect"):
            changeColorEffect(keyValue);
            break;
          case keyType.startsWith("changebackgroundcolor"):
            changeBackgroundColor(keyValue);
            break;
        }

        handleCollision(); // Re-check collision after each action
      }
    };

    const moveCharacter = async (keyType, keyValue) => {
      const increment = keyValue * (keyType.startsWith("movex") ? 1 : 1);
      const isMoveX = keyType.startsWith("movex");
      const property = isMoveX ? "left" : "top";

      const targetValue = parseFloat(element.style[property] || 0) + increment;

      await animateMovement(property, ref_left.current, targetValue);

      ref_left.current = parseFloat(element.style.left) || ref_left.current;
      ref_top.current = parseFloat(element.style.top) || ref_top.current;

      updateCharacterPosition(ref_left.current, ref_top.current);
    };

    const rotateCharacter = (keyType, keyValue) => {
      ref_angle.current += keyType.startsWith("turnanti") ? -keyValue : keyValue;
      element.style.transform = `rotate(${ref_angle.current}deg) scale(${ref_scale.current})`;
    };

    const rotateDegree = (keyValue) => {
      const normalizedAngle = ((keyValue % 360) + 360) % 360;
      element.style.transform = `rotate(${normalizedAngle}deg) scale(${ref_scale.current})`;
    };

    const changeSize = (keyType, keyValue) => {
      ref_scale.current += keyType.startsWith("changesize") ? keyValue / 100 : 0;
      element.style.transform = `rotate(${ref_angle.current}deg) scale(${ref_scale.current})`;
    };

    const wait = (keyValue) => {
      return new Promise(resolve => setTimeout(resolve, keyValue * 1000));
    };

    const speak = async (keyValue) => {
      setMessage(keyValue);
      setShowMessage(true);
      await wait(5); // Display for 5 seconds
      setShowMessage(false);
    };

    const changeColorEffect = (keyValue) => {
      const currentColor = element.style.filter || "none";
      const currentEffect = parseInt(currentColor.replace(/\D/g, ""), 10) || 0;
      element.style.filter = `hue-rotate(${currentEffect + keyValue}deg)`;
    };

    const changeBackgroundColor = (keyValue) => {
      setBackgroundColor(keyValue);
      element.style.backgroundColor = keyValue;
    };

    const animateMovement = (property, startValue, targetValue) => {
      return new Promise((resolve) => {
        const animate = () => {
          const currentValue = parseFloat(element.style[property] || 0);
          if (
            (startValue < targetValue && currentValue < targetValue) ||
            (startValue > targetValue && currentValue > targetValue)
          ) {
            const newValue = currentValue + (startValue < targetValue ? 1 : -1);
            element.style[property] = `${newValue}px`;
            requestAnimationFrame(animate);
          } else {
            resolve();
          }
        };
        animate();
      });
    };

    if (globalactive === name) {
      Animations();
    }
  }, [stream, globalactive, name, characters]);

  return (
    <div style={{ position: "relative" }}>
      <ToastContainer />
      <div
        id={name}
        style={{
          position: "absolute",
          left: `${ref_left.current}px`,
          top: `${ref_top.current}px`,
          transition: "left 0.1s, top 0.1s",
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: backgroundColor || "transparent",
          transform: `rotate(${ref_angle.current}deg) scale(${ref_scale.current})`,
        }}
        ref={ref_cat}
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="95.17898101806641"
          height="100.04156036376953"
          viewBox="0.3210171699523926 0.3000000357627869 95.17898101806641 100.04156036376953"
          version="1.1"
          xmlSpace="preserve"
        >
          <g>
            <g id="Page-1" stroke="none" fillRule="evenodd">

              <g id="costume1">
                <g id="costume1.1">
                  <g id="tail">
                    <path
                      d="M 21.9 73.8 C 19.5 73.3 16.6 72.5 14.2 70.3 C 8.7 65.4 7 57.3 3.2 59.4 C -0.7 61.5 -0.6 74.6 11.6 78.6 C 15.8 80 19.6 80 22.7 79.9 C 23.5 79.9 30.4 79.2 32.8 75.8 C 35.2 72.4 33.5 71.5 32.7 71.1 C 31.8 70.6 25.3 74.4 21.9 73.8 Z "
                      stroke="#001026"
                      strokeWidth="1.2"
                      fill="#FFAB19"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 3.8 59.6 C 1.8 60.2 0.8 64.4 1.8 67.9 C 2.8 71.4 4.4 73.2 5.7 74.5 C 5.5 73.8 5.1 71.6 6.8 70.3 C 8.9 68.6 12.6 69.5 12.6 69.5 C 12.6 69.5 9.5 65.7 7.9 63 C 6.3 60.7 5.8 59.2 3.8 59.6 Z "
                      id="detail"
                      fill="#FFFFFF"
                      strokeWidth="1"
                    />
                  </g>
                  <path
                    d="M37.7,81.5 C35.9,82.7 29.7,87.1 21.8,89.6 L21.4,89.7 C21,89.8 20.8,90.3 21,90.7 C22.7,93.1 25.8,97.9 20.3,99.6 C15,101.3 5.1,87.2 9.3,83.5 C11.2,82.1 12.9,82.8 13.8,83.2 C14.3,83.4 14.8,83.4 15.3,83.3 C16.5,82.9 18.7,82.1 20.4,81.2 C24.7,79 25.7,78.1 27.7,76.6 C29.7,75.1 34.3,71.4 38,74.6 C41.2,77.3 39.4,80.3 37.7,81.5 Z"
                    id="leg"
                    stroke="#001026"
                    strokeWidth="1.2"
                    fill="#FFAB19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M53.6,60.7 C54.1,61.1 60.2,68.3 62.2,66.5 C64.6,64.4 67.9,60.3 71.5,63.6 C75.1,66.9 68.3,72.5 65.4,74 C58.5,77.1 52.9,71.2 51.7,69.6 C50.5,68 48.4,65.3 48.4,62.7 C48.5,59.9 51.9,59.2 53.6,60.7 Z"
                    id="arm"
                    stroke="#001026"
                    strokeWidth="1.2"
                    fill="#FFAB19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="body-and-leg">
                    <path
                      d="M 46.2 76.7 C 47.4 75.8 48.6 74.3 50.2 72 C 51.5 70.1 52.9 66.4 52.9 66.4 C 53.8 63.9 54.4 59.1 51.1 59.2 C 48.9 59.3 46.9 59 43.5 58.5 C 37.5 57.3 36.4 56.5 33.9 60.6 C 31.2 65.4 24.3 68.9 32.8 77.2 C 32.8 77.2 37.7 81 43.6 86.8 C 47.6 90.7 53.9 96.3 56.1 98.2 C 56.6 98.6 57.2 98.8 57.8 98.9 C 67.5 99.8 74.7 98.8 74.7 94.5 C 74.7 87.3 60.4 89.8 60.4 89.8 C 60.4 89.8 55.8 85.9 53.7 84 L 46.2 76.7 Z "
                      id="body"
                      stroke="#001026"
                      strokeWidth="1.2"
                      fill="#FFAB19"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 50.6 70 C 50.6 70 52.5 67.5 48.2 64.8 C 43.7 61.9 42 65.1 40.2 67.5 C 38.2 70.6 40.2 72.1 42.2 73.9 C 43.8 75.4 45.3 76.6 45.3 76.6 C 45.3 76.6 48.4 74.5 50.6 70 Z "
                      id="tummy"
                      fill="#FFFFFF"
                      strokeWidth="1"
                    />
                  </g>
                  <path
                    d="M30.2,68.4 C32.4,71.2 35.8,74.7 31.5,77.6 C25.6,80.9 20.7,70.9 19.7,67.4 C18.8,64.3 21.4,62.3 23.6,60.6 C27.9,57.5 31.5,54.7 35.5,56.2 C40.5,58 36.9,62 34.4,63.8 C32.9,64.9 31.4,66.1 30.3,66.8 C30,67.3 29.9,67.9 30.2,68.4 Z"
                    id="arm"
                    stroke="#001026"
                    strokeWidth="1.2"
                    fill="#FFAB19"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="head">
                    <path
                      d="M 53.1 9 C 50.8 8.6 48.4 8.4 45.6 8.6 C 40.9 8.8 36.4 10.5 36.4 10.5 L 24.3 2.6 C 23.9 2.4 23.4 2.7 23.5 3.1 L 25.6 21 C 26.2 20.2 15 33.8 22.1 45.2 C 29.2 56.6 44.3 61.7 63.1 58 C 81.9 54.3 86.3 43.5 85.1 37.8 C 83.9 32.1 76.8 30 76.8 30 C 76.8 30 76.7 25.5 73.5 20 C 71.6 16.7 65.2 12 65.2 12 L 62.6 1.3 C 62.5 0.9 62 0.8 61.7 1 L 53.1 9 Z "
                      stroke="#001026"
                      strokeWidth="1.2"
                      fill="#FFAB19"
                    />
                    <path
                      d="M 76.5 30.4 C 76.5 30.4 83.4 32.2 84.6 37.9 C 85.8 43.6 81 53.9 62.4 57.5 C 38.2 62.5 26.7 48.1 33.4 37.5 C 40.1 26.8 51.6 35.9 60 35.3 C 67.2 34.8 68 28.5 76.5 30.4 Z "
                      id="face"
                      fill="#FFFFFF"
                      strokeWidth="1"
                    />
                    <path
                      d="M 45 41.1 C 45 40.7 45.4 40.4 45.8 40.5 C 47.7 41.2 53.1 42.8 59.1 43.2 C 64.5 43.5 67.7 43.2 69.2 42.9 C 69.7 42.8 70.1 43.3 69.9 43.8 C 69 46.5 65.2 54 54.7 53.4 C 45.6 52.4 44.7 46 45 41.1 Z "
                      id="mouth"
                      stroke="#001026"
                      strokeWidth="1.2"
                      fill="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 83 35.4 C 83 35.4 90.2 35.3 94.9 31.5 "
                      id="whisker"
                      stroke="#001026"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 83.4 41.3 C 83.4 41.3 87.3 43.2 93.6 42.7 "
                      id="whisker"
                      stroke="#001026"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 59.6 32.7 C 61.7 32.7 63.9 32.9 64 33.6 C 64.1 35 62.6 37.8 61 37.9 C 59.2 38.1 55 35.6 55 34 C 54.9 32.8 57.6 32.7 59.6 32.7 Z "
                      id="nose"
                      stroke="#001026"
                      strokeWidth="1.2"
                      fill="#001026"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 14.6 31.2 C 14.6 31.2 23.2 34 26.7 37.1 "
                      id="whisker"
                      stroke="#001026"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M 15.3 41.2 C 15.3 41.2 22.7 42.3 27 40.6 "
                      id="whisker"
                      stroke="#001026"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <g id="eye">
                      <path
                        d="M 71.4 21 C 74.3 25.5 74.4 30.6 71.6 32.4 C 68.8 34.2 64.2 32.1 61.2 27.6 C 58.3 23.1 58.2 18 61 16.2 C 63.8 14.3 68.5 16.5 71.4 21 Z "
                        id="pupil"
                        stroke="#001026"
                        strokeWidth="1.2"
                        fill="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 71 26.7 C 71 27.8 70.2 28.7 69.2 28.7 C 68.2 28.7 67.4 27.8 67.4 26.7 C 67.4 25.6 68.2 24.7 69.2 24.7 C 70.2 24.7 71 25.6 71 26.7 "
                        id="pupil"
                        fill="#001026"
                        strokeWidth="1"
                      />
                    </g>
                    <g id="eye">
                      <path
                        d="M 46.6 23.8 C 49.6 28.2 49.4 33.6 46.7 35.5 C 43.4 37.4 39 36 36 31.6 C 32.9 27.2 32.7 21.5 35.8 19.3 C 38.9 17 43.6 19.4 46.6 23.8 Z "
                        stroke="#001026"
                        strokeWidth="1.2"
                        fill="#FFFFFF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M 46 29.6 C 46 30.7 45.2 31.6 44.2 31.6 C 43.2 31.6 42.4 30.7 42.4 29.6 C 42.4 28.5 43.2 27.6 44.2 27.6 C 45.2 27.7 46 28.5 46 29.6 "
                        id="pupil"
                        fill="#001026"
                        strokeWidth="1"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
        {showMessage && (
          <div
            className="message-box"
            style={{
              position: "relative",
              left: `${ref_left.current + 100}px`,
              top: `${ref_top.current - 100}px`,
              backgroundColor: "#FFD6E1",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.6)",
              color: "#333",
              textShadow: "1px 1px 1px rgba(255, 255, 255, 0.5)",
              width: "150px",
              fontSize: "12px",
              fontWeight: "300",
            }}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </div >

  );
}
