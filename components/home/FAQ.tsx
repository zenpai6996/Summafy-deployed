"use client";
import {AnimatePresence,motion} from "framer-motion";
import Tag from "@/components/common/Tag";
import {twMerge} from "tailwind-merge";
import {useState} from "react";

const faqs = [
        {
            question: "How is Summafy different from other Summary tools?",
            answer: "Unlike traditional AI summary tools, Summafy prioritizes speed and simplicity without sacrificing power. Our intelligent interface adapts to your workflow, reducing clicks and keeping you in your creative flow.",
        },
        {
            question: "Is there a learning curve?",
            answer: "Summafy is designed to feel intuitive from day one. Most users are productive within hours, not weeks. We also provide interactive tutorials and comprehensive documentation to help you get started.",
        },
        {
            question: "Can I use Summafy on my mobile device?",
            answer: "Yes, Summafy is fully responsive and works seamlessly on mobile devices. You can access your projects and collaborate with your team from anywhere.",
        },
        {
            question: "Is my data secure with Summafy?",
            answer: "Absolutely! We prioritize your privacy and security. All data is encrypted in transit and at rest, ensuring that your information is safe with us.",
        },
    ];

    export default function Faqs() {
        const [selectedIndex, setSelectedIndex] = useState(0);

        return <section id={"Faq"} className={"py-24"}>
            <div className={"container"}>
                <div className={"flex justify-center"}>
                    <h2 className={"font-bold text-xl uppercase mb-4 text-[#C68EFD]"}><Tag>Faqs</Tag></h2>
                </div>
                <h3 className={"text-gray-300 text-3xl font-medium mt-6 text-center max-w-xl mx-auto"}>Questions? We've got <span className={"text-purple-400"}>answers</span> </h3>
                <div className={"mt-12 flex flex-col gap-6 max-w-xl mx-auto"}>
                    {faqs.map((faq,faqIndex) => (
                        <div key={faq.question}
                             className={"bg-neutral-800 rounded-2xl border border-white/10 p-6 "}>
                            <div className={"flex justify-between items-center"} onClick={(e) =>{
                                e.stopPropagation();
                                setSelectedIndex(faqIndex)}}>
                                <h4 className={"text-gray-300 font-medium cursor-pointer "}>{faq.question}</h4>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round"
                                     className={twMerge("feather feather-plus text-purple-400 flex-shrink-0 transition duration-300",selectedIndex === faqIndex && "rotate-45")}>
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </div>
                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div initial={
                                        {
                                            height:0,
                                            marginTop:0,
                                        }
                                    } animate={{
                                        height:'auto',
                                        marginTop:24,
                                    }} exit={{
                                        height:0,
                                        marginTop:0,
                                    }} className={"overflow-hidden"}>
                                        <p className={"text-white/50 "}>{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>;
    }