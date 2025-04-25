"use client"

import {PlaneLanding, PlaneTakeoff} from "lucide-react";
import {useState} from "react";

export default function DemoSection(){
    const [isHovered, setIsHovered] = useState(false);

    return(
      <section className={"relative"}>
          <div className={"py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"}>
             
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