'use server';
import {fetchAndExtractPdfText} from "@/lib/langchain";
import {generateSummaryFromGemini} from "@/lib/geminiAi";
import {generateSummaryFromCohere} from "@/lib/aiService";

export async function generatePDFSummary(uploadResponse:[
    {
    serverData:{
        userId:string,
        file:{
            url:string,
            name:string
        },
    };
}])  {
    if(!uploadResponse){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }
    const {serverData:{userId,file:{url:pdfUrl,name:fileName}}} = uploadResponse[0];

    if(!pdfUrl){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log({pdfText});
        let summary;
        try{
             summary = await generateSummaryFromCohere(pdfText);
            console.log(summary);

        }catch(error){
            console.log(error);
            //call gemini api if openai fails
            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try{
                    summary= await generateSummaryFromGemini(pdfText);
                }catch(error){
                    console.error('Gemini API failed after primary AI provider');

                }
            }
        }
        if(!summary){
            return{
                success:false,
                message:'Failed to generate summary',
                data:null,
            };
        }
        return{
            success:true,
            message:'Summary Generated successfully',
            data:{
                summary,
            },
        }
    }catch(err){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }

}