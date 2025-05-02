"use client"
import {Card } from "../ui/card";
import {useState} from "react";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import {MotionDiv} from "@/components/common/motion-wrapper";
import {containerVariants, itemVariants} from "@/utils/constants";

// Create a simplified version of ContentSection specifically for the demo
const DemoContentSection = ({ title, points }: { title: string; points: string[] }) => {
    return (
        <MotionDiv
            variants={containerVariants}
            key={points.join(' ')}
            initial={"hidden"}
            whileInView={'visible'}
            exit={'exit'}
            className="space-y-4">
            {points.map((point, index) => (
                <MotionDiv variants={itemVariants} key={index} className="p-2 cursor-pointer rounded-lg hover:bg-gray-200 border-gray-400 hover:shadow-lg transition-all border hover:border-purple-500  duration-200">
                    <p className="text-sm text-gray-500 hover:text-gray-600 duration-300 transition-colors leading-relaxed">{point}</p>
                </MotionDiv>
            ))}
        </MotionDiv>
    );
};

export const parseSection = (section:string):{title:string;points:string[]} => {
    const [title, ...contentLines] = section.split('\n');
    const cleanTitle = title.startsWith('#') ? title.substring(1).trim() : title.trim();
    const content = contentLines.join('\n');
    const lines = content.split('\n');
    const points : string[] =[];
    let currentPoint = '';
    lines.forEach((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*') || trimmedLine.startsWith('.')) {
            if (currentPoint) points.push(currentPoint);
            currentPoint = trimmedLine.substring(1).trim();
        } else if (!trimmedLine) {
            if (currentPoint) points.push(currentPoint);
            currentPoint = '';
        } else {
            currentPoint += (currentPoint ? ' ' : '') + trimmedLine;
        }
    });
    if(currentPoint) points.push(currentPoint.trim());
    return {
        title: cleanTitle,
        points:points.filter(
            (point) => point && !point.startsWith('#') && !point.startsWith('[Choose'),
        ) as string[],
    }
}

export function DemoSummaryViewer({ summary }: { summary: string }) {
    const [currentSection, setCurrentSection] = useState(0);

    const handleNext = () => {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    };

    const handlePrevious = () => {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
    };

    const handleSectionSelect = (index: number) => {
        setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));
    };

    const sections = summary.split('\n# ').map((section) => section.trim()).filter(Boolean).map(parseSection);

    return (
        <div className="flex flex-col gap-4">
            <Card className={"relative px-2 h-[400px] sm:h-[450px] lg:h-[550px] w-full max-w-lg min-w-[320px] overflow-hidden bg-white backdrop-blur-lg shadow-2xl rounded-3xl border border-purple-500/10"}>
                <ProgressBar sections={sections} currentSection={currentSection} />
                <MotionDiv
                    key={currentSection}
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.2,ease:'easeInOut'}}
                    exit={{opacity:0}}
                    className={"h-full overflow-y-auto scrollbar-hide pt-8 sm:pt-12 pb-16 sm:pb-20"}>
                    <div className={"px-3 sm:px-4"}>
                        <SectionTitle title={sections[currentSection]?.title || ''} />
                        <DemoContentSection
                            title={sections[currentSection]?.title || ''}
                            points={sections[currentSection]?.points || []}
                        />
                    </div>
                </MotionDiv>
                <NavigationControls
                    currentSection={currentSection}
                    totalSections={sections.length}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    onSectionSelect={handleSectionSelect}
                />
            </Card>
        </div>
    );
}

const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className={"flex flex-col gap-1 mb-7 sticky top-0 pt-2 pb-3 bg-transparent backdrop-blur-xs rounded-full z-10"}>
            <h2 className={"text-xl lg:text-2xl font-bold text-center flex items-center text-gray-600 justify-center gap-2"}>
                {title}
            </h2>
        </div>
    )
}