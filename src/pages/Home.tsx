import { useState } from "react";
import hero from "../assets/hero.jpeg";

export default function Home() {
  
  return (
    <>
      <div>
          <div className="h-full flex justify-center">
            <div className="flex flex-col items-center  md:flex md:flex-row-reverse md:justify-between  md:w-full md:mx-10 ">
              <img
                src={hero}
                alt="hero"
                className="md:w-1/2 md:max-w-[673px] md:min-w-[529px]"
              />
              <div className="  h-full md:grow flex flex-col items-center gap-8 pt-6 md:pt-8">
                <div className=" h-auto flex-col items-center justify-center  gap-8 ">
                  <h2 className="text-center font-bold text-5xl md:text-7xl md:text-left tracking-wide ">
                    Up Skill <br /> like <br />
                    Never Before
                  </h2>
                  <p className="text-center md:text-left font-semibold text-2xl md:text-4xl py-8">
                    Flex Skill, meet skilled people
                  </p>
                </div>
                <button className=" bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-[#6b6966] hover:text-black w-28 md:w-40 h-16 md:h-16 md:text-2xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )
      </div>
    </>
  );
}
