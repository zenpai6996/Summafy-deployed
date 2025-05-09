"use client"
import {Card } from "../ui/card";
import {useState} from "react";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";
import ContentSection from "./content-section";
import {useTransition} from "react";
import {explainPoint} from "@/actions/summary-actions";
import {toast} from "sonner";
import {Loader2} from "lucide-react";
import {MotionDiv} from "@/components/common/motion-wrapper";
import {Button} from "@/components/ui/button";

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
interface SummaryViewerProps {
    summary: string;
    isProUser: boolean;
}

export function SummaryViewer({ summary,isProUser }: SummaryViewerProps) {
    const [currentSection, setCurrentSection] = useState(0);
    const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handlePointClick = async (point: string) => {
        if (!isProUser) {
            setSelectedPoint(point);
            setExplanation(null);
            toast.error("Upgrade Required", {
                description: "This feature is only available for Pro users. Upgrade your plan to access detailed explanations.",
                action: {
                    label: "Upgrade",
                    onClick: () => window.open("/", "_blank")
                }
            });
            return;
        }
        setSelectedPoint(point);
        setExplanation(null);
        setIsLoading(true);
        toast.info("Generating Explanation📄...",{
            description: "Hang tight! Summafy is reading through the Point ✨"
        });
        startTransition(async () => {
            const result = await explainPoint(point, summary );
            if (result.success) {
                setExplanation(result.explanation);
                toast.success(`Explanation generated Successfully !`)

            } else {
                setExplanation("Could not generate explanation.");
                toast.error(`Could not generate explanation.`)

            }
            setIsLoading(false);
        });
    };

    const handleNext = () => {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
        setSelectedPoint(null); // Clear explanation when changing sections
        setExplanation(null);
    };

    const handlePrevious = () => {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
        setSelectedPoint(null); // Clear explanation when changing sections
        setExplanation(null);
    };

    const handleSectionSelect = (index: number) => {
        setCurrentSection(Math.min(Math.max(index, 0), sections.length - 1));
        setSelectedPoint(null); // Clear explanation when changing sections
        setExplanation(null);
    };

    const sections = summary.split('\n# ').map((section) => section.trim()).filter(Boolean).map(parseSection);

    return (
        <div className="flex flex-col gap-4">
            <Card className={"relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-gradient-to-br from-background via-background/95 to-purple-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-purple-500/10"}>
                <ProgressBar sections={sections} currentSection={currentSection} />
                <MotionDiv
                    key={currentSection}
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    transition={{duration:0.2,ease:'easeInOut'}}
                    exit={{opacity:0}}
                    className={"h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24"}>
                    <div className={"px-4 sm:px-6"}>
                        <SectionTitle title={sections[currentSection]?.title || ''} />
                        <ContentSection
                            title={sections[currentSection]?.title || ''}
                            points={sections[currentSection]?.points || []}
                            onPointClick={handlePointClick}
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

            {/* Explanation Section */}
            {selectedPoint && (
                <Card className="w-full xl:w-[600px] p-6 bg-gradient-to-br from-background via-background/95 to-purple-500/5 backdrop-blur-lg shadow-lg rounded-3xl border border-purple-500/10">
                    <h3 className="text-lg font-semibold mb-4">Explanation</h3>
                    <div className="mb-2 p-2 bg-gray-100/10 rounded-lg">
                        <p className="text-sm text-muted-foreground/90">{selectedPoint}</p>
                    </div>

                    {!isProUser ? (
                        <div className="flex flex-col items-center justify-center p-4 gap-2">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground mb-4">
                                    This feature is only available for Pro users.
                                </p>
                                <Button
                                    variant="default"
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                    onClick={() => window.open("/", "_blank")}
                                >
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </div>
                    ) : isPending ? (
                        <div className="flex flex-col items-center justify-center p-4 gap-2">
                            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                            <p className="text-sm text-muted-foreground">Generating explanation...</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground/90 leading-relaxed">
                            {explanation}
                        </p>
                    )}
                </Card>
            )}
        </div>
    );
}
const SectionTitle = ({ title }: { title: string }) => {
    return (
        <div className={"flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10"}>
            <h2 className={"text-1xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2"}>
                {title}
            </h2>
        </div>
    )
}