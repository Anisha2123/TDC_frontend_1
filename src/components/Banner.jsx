  import { useState, useEffect } from "react";
import './styles.css';
import i1 from "../images/i1.jpg";
import i5 from "../images/i5.jpg";
import i6 from "../images/i6.jpg";
import i7 from "../images/i7.jpg";
const banners = [
  {
    title: "The Front-end Coding Championship",
    description:
      "Happening on 14th & 15th December\nWrite Code, Earn Geekcoins & Win exclusive rewards!",
    buttonText: "Register Now",
    highlightText: "Registration Classes on 13th December 2024!",
    imgSrc: i1,
  },
  {
    title: "Learn React with Hands-On Projects",
    description:
      "Master React by building real-world projects. Perfect for beginners and pros alike!",
    buttonText: "Start Learning",
    highlightText: "New Batch Starting Soon!",
    imgSrc: i5,
  },
  {
    title: "Join the JavaScript Bootcamp",
    description:
      "Become a JavaScript expert with our intensive bootcamp. Limited slots available!",
    buttonText: "Apply Now",
    highlightText: "Enrollment Closes Soon!",
    imgSrc: i6,
  },
  {
    title: "Learn React with Hands-On Projects",
    description:
      "Master React by building real-world projects. Perfect for beginners and pros alike!",
    buttonText: "Start Learning",
    highlightText: "New Batch Starting Soon!",
    imgSrc: i7,
  }

];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Switch content every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentBanner = banners[currentIndex];

  return (
    <div className="banner relative overflow-hidden w-full h-[400px] md:h-[500px] bg-gradient-to-r from-[#91a3b0] to-[#333333] ">
      <div className="container relative px-6 py-10 mx-auto h-full">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-2 h-full">
          {/* Left Section */}
          <div className="text-[#fefefa] text-center md:text-left">
            <h1 className="text-[#333333] mb-4 text-3xl font-bold md:text-5xl">
              {currentBanner.title}
            </h1>
            <p className="mb-6 text-lg opacity-90 whitespace-pre-line">
              {currentBanner.description}
            </p>
            <div className=" flex justify-center md:justify-start items-center gap-4">
              <div className=" high_text inline-flex items-center gap-2 px-5 py-2 text-sm bg-[#333333]/80 rounded-full">
                <span className=" w-2 h-2 bg-[#00c853] rounded-full animate-pulse" />
                {currentBanner.highlightText}
              </div>
            </div>
            <button className="btn-bn px-6 py-3 mt-8 font-medium text-[#333333] bg-[#ffde58] rounded-md hover:bg-[#333333] hover:text-[#ffde58] transition-all">
              {currentBanner.buttonText}
            </button>
          </div>

          {/* Right Section */}
          <div className=" relative flex items-center justify-center h-full">
            <img
              src={currentBanner.imgSrc}
              alt={currentBanner.title}
              className=" object-cover rounded-lg shadow-lg"
            />
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-[#ffde58] rounded-full filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-[#91a3b0] rounded-full filter blur-3xl opacity-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
