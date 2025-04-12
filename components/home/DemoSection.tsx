"use client"

import {PlaneLanding, PlaneTakeoff} from "lucide-react";
import {useState} from "react";

export default function DemoSection(){
    const [isHovered, setIsHovered] = useState(false);

    return(
      <section className={"relative"}>
          <div className={"py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"}>
              <div
                  aria-hidden={"true"}
                  className="pointer-events-none absolute inset-x-0 top-[-400px] -z-10 transform-gpu overflow-hidden blur-3xl"
              >
                  <div
                      className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                      style={{
                          clipPath:
                              'polygon(74.15% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0. 1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%,47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.14%)',
                      }}
                  />
              </div>
              <div
                    className={"flex flex-col items-center text-center space-y-4"}>
                  <div className={"inline-flex items-center justify-center p-2 rounded-full bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4"}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                  >
                      {isHovered ? (
                          <PlaneTakeoff style={{ width: '24px', height: '24px' }}  className={"   text-[#C68EFD] animate-pulse "} />
                      ) : (
                          <PlaneLanding style={{ width: '24px', height: '24px' }}  className={"  text-[#C68EFD] animate-pulse "} />
                      )}

                  </div>
            <div className={"text-center mb-16"}>
                <h3 className={"font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"}>
                    Watch how Summafy converts complex documents into <span className={"bg-gradient-to-r from-[#E9A5F1] to-[#C68EFD] bg-clip-text text-transparent"}>clear, concise summaries</span> instantly
                </h3>
            </div>
              <div className={"flex justify-center items-center px-2 sm:px-4 lg:px-6"}>
                  {/*Summary Viewer*/}
              </div>
          </div>
          </div>
      </section>
   )
}