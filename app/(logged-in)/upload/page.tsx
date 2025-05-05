
import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";
import {MotionDiv} from "@/components/common/motion-wrapper";
import {containerVariants} from "@/utils/constants";
import { getSubscriptionDetails } from "@/lib/subscriptions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function Page(){
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
        return redirect('/sign-in');
    }
    const subscriptionDetails = await getSubscriptionDetails(userId);
    const isLimitReached = subscriptionDetails.is_limit_reached;
    return(
        <section className={"min-h-screen"}>
        
            <MotionDiv
                variants={containerVariants}
                initial={"hidden"}
                animate={"visible"}
                className={"mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"}>
                <div className={"flex flex-col items-center justify-center gap-6 text-center"}>
                    <UploadHeader
                        isLimitReached={isLimitReached}
                        currentPlan={subscriptionDetails.plan_id}
                        uploadsUsed={subscriptionDetails.uploads_used}
                        uploadLimit={subscriptionDetails.upload_limit}
                    />
                    <UploadForm  userId={userId}/>
                </div>
            </MotionDiv>
        </section>
    )
}