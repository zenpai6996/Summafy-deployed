
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import {MotionDiv} from "@/components/common/motion-wrapper";
import {containerVariants} from "@/utils/constants";




export default function Page(){

    return(
        <section className={"min-h-screen"}>
        
            <MotionDiv
                variants={containerVariants}
                initial={"hidden"}
                animate={"visible"}
                className={"mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"}>
                <div className={"flex flex-col items-center justify-center gap-6 text-center"}>
                    <UploadHeader/>
                    <UploadForm/>
                </div>
            </MotionDiv>
        </section>
    )
}