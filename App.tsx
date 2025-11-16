import React, { useState, useEffect } from "react";
import {
  PhoneIcon,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
} from "./components/Icons";

// New component for the falling animation
const FallingDivs: React.FC = () => {
  const [divs, setDivs] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    // Generate divs based on screen width
    const numDivs = Math.floor(window.innerWidth / 25);
    const generatedDivs = Array.from({ length: numDivs }).map((_, index) => {
      const style: React.CSSProperties = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 3}s`, // 3s to 8s duration
        animationDelay: `${Math.random() * 8}s`,
      };
      return <div key={index} className="falling-div" style={style}></div>;
    });
    setDivs(generatedDivs);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {divs}
    </div>
  );
};

const App: React.FC = () => {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const isTouchDevice = () =>
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice()) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    const rotateX = -(y / height - 0.5) * 25; // Reduced rotation for a subtler effect
    const rotateY = (x / width - 0.5) * 25;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice()) return;
    setStyle({
      transform: "rotateX(0) rotateY(0)",
      transition: "transform 0.5s ease-in-out",
    });
  };

  return (
    <>
      <FallingDivs />
      <div
        className="min-h-screen w-full flex items-center justify-center p-4 overflow-hidden"
        style={{ perspective: "2000px" }}
      >
        <div
          className="relative group w-full max-w-sm z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ ...style, transformStyle: "preserve-3d" }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative w-full bg-gray-950/80 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col items-center space-y-6">
            <div style={{ transform: "translateZ(80px)" }}>
              <img
                src="./sq-profile-pic.png"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-gray-800 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-purple-500"
                style={{
                  boxShadow:
                    "0 0 5px #fff, 0 0 15px #f0f, 0 0 30px #f0f, 0 0 50px #f0f",
                }}
              />
            </div>

            <div
              className="text-center"
              style={{ transform: "translateZ(50px)" }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wider text-glow group-hover:animate-pulse">
                Sourabh Majhee
              </h1>
              <p className="text-purple-300 text-base sm:text-lg tracking-widest">
                Software Developer
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-2"
              style={{ transform: "translateZ(40px)" }}
            >
              <a
                href="tel:+919303293075"
                className="group/item flex items-center justify-center gap-2 w-full sm:w-auto border border-white/20 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_theme(colors.purple.500)] transform hover:scale-105"
              >
                <PhoneIcon className="w-4 h-4 text-purple-400" />
                <span>Call</span>
              </a>

              <a
                href="mailto:sourabhmajhee1111111@gmail.com"
                className="group/item flex items-center justify-center gap-2 w-full sm:w-auto border border-white/20 rounded-full px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_theme(colors.pink.500)] transform hover:scale-105"
              >
                <EmailIcon className="w-4 h-4 text-pink-400" />
                <span>Email</span>
              </a>
            </div>

            <div
              className="w-1/2 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"
              style={{ transform: "translateZ(30px)" }}
            ></div>

            <div
              className="flex justify-center space-x-6"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* <a
                href="https://github.com/Sourabh-Majhee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110 hover:[&>svg]:drop-shadow-[0_0_8px_#fff]"
              >
                <GitHubIcon className="w-8 h-8" />
              </a> */}
              <a
                href="https://www.linkedin.com/in/sourabh-majhee-443ba1330/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110 hover:[&>svg]:drop-shadow-[0_0_8px_#0a66c2]"
              >
                <LinkedInIcon className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
