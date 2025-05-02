
import {MotionDiv, MotionH2, MotionH3} from "@/components/common/motion-wrapper";
import {SummaryViewer} from "@/components/Summaries/summary-viewer";
import Tag from "@/components/common/Tag";
import {DemoSummaryViewer} from "@/components/Summaries/demo-summary-viewer";

const DEMO_SUMMARY = `# AI-Powered Document Summarization Tool
. 🎯 Transform lengthy documents into concise, actionable summaries with powerful AI technology.
. 📌 Save hours of reading time without missing crucial information.

# Document Details
. 📄 Document Type: In-depth Product Overview providing key features, benefits, and use cases
. 👥 Intended Audience: Tailored for professionals, academic researchers, and higher education students who require a thorough understanding of the product's capabilities
# Key Highlights
. ⭐ Interactive interface allows deeper exploration of any summary point
. 📊 Visual aids enhance comprehension and retention of complex information

# Why It Matters
. 💡 In today's information-overloaded world, the ability to quickly digest complex content gives professionals a competitive edge while reducing cognitive burden and increasing productivity.

# Main Points
. 🎯 Reduces hours of reading into minutes while preserving critical context
. 💪 Customizable output lets you focus on exactly what matters to you
. 🔥 Multi-document analysis connects insights across multiple sources

# Pro Tips
. ⭐ Use the explanation feature to dive deeper into complex points
. 🔄 Explore related documents for a comprehensive understanding of the topic

# Key Terms to Know
. 📚 Natural Language Processing: AI technology that helps computers understand human language
. 🔍 Smart Extraction: Automatic identification of the most important information in a document

# Bottom Line
. 💫 Summafy transforms how you consume information, making complex documents accessible and actionable in just minutes`;

export default function DemoSection(){

    return(
      <section className={"relative"}>
          <div className={"py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12"}>
             
              <div
                    className={"flex flex-col items-center text-center space-y-4"}>
                  <MotionH2 initial={{opacity:0,y:20}}
                            whileInView={{opacity:1,y:0}}
                            transition={{duration:0.5,delay:0.2}}
                            className={"uppercase font-bold text-xl mb-8 text-[#C68EFD]"}>
                      <Tag>Demo</Tag>
                  </MotionH2>
            <div className={"text-center mb-16"}>
                <MotionH3
                    initial={{y:20,opacity:0}}
                    className={"font-bold text-3xl text-gray-300 max-w-2xl mx-auto px-4 sm:px-6"}
                    whileInView={{y:0,opacity:1}}
                    transition={{duration:0.5,delay:0.2}}
                >
                    Watch how Summafy converts complex documents into <span className={"bg-gradient-to-r from-[#E9A5F1] to-[#C68EFD] bg-clip-text text-transparent"}>clear, concise summaries</span> instantly
                </MotionH3>
            </div>
              </div>
              <MotionDiv
                  initial={{opacity:0}}
                  className={"flex justify-center items-center px-2 sm:px-4 lg:px-6 w-full "}
                  whileInView={{opacity:1}}
                  transition={{duration:0.5}}
              >
                  <DemoSummaryViewer summary={DEMO_SUMMARY}/>
              </MotionDiv>

          </div>
      </section>
   )
}