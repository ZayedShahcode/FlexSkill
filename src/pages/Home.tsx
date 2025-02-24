import { useState } from "react";
import hero from "../assets/hero.jpeg";

export default function Home() {
  const [selected, setSelected] = useState("for");
  return (
    <>
      <div>
        {/* Setting User Type */}
        <div className="flex items-center justify-center text-center mt-2 gap-4 cursor-pointer text-lg font-semibold">
          <h2
            className={
              "h-full border border-black rounded-lg w-24 h-10  md:w-28 md:h-12 grid place-items-center md:text-xl " +
              (selected === "for" ? "bg-gray-800 text-white" : "")
            }
            onClick={() => setSelected("for")}
          >
            For Hire
          </h2>
          <h2
            className={
              "h-full border border-black rounded-lg w-24 h-10  md:w-28 md:h-12  grid place-items-center md:text-xl " +
              (selected === "to" ? "bg-gray-800 text-white" : "")
            }
            onClick={() => setSelected("to")}
          >
            To Hire
          </h2>
        </div>

        {/* For Hire Interface */}
        {selected === "for" ? (
          <div className="h-full flex justify-center">
            <div className="flex flex-col items-center  md:flex md:flex-row-reverse md:justify-between  md:w-full md:mx-10 ">
              <img
                src={hero}
                alt="hero"
                className="md:w-1/2 md:max-w-[673px] md:min-w-[529px]"
              />
              <div className="  h-full md:grow flex flex-col items-center gap-8 pt-6 md:pt-40">
                <div className=" h-auto flex-col items-center justify-center  gap-8 ">
                  <h2 className="text-center font-bold text-5xl md:text-7xl md:text-left tracking-wide ">
                    Up Skill <br /> like <br />
                    Never Before
                  </h2>
                  <p className="text-center md:text-left font-semibold text-2xl md:text-4xl py-8">
                    Flex Skill, where skill meets money
                  </p>
                </div>
                <button className=" bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-[#6b6966] hover:text-black w-28 md:w-40 h-16 md:h-16 md:text-2xl">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>Hire Me</>
        )}
      </div>
    </>
  );
}
