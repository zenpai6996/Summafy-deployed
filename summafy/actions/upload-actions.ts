'use server';
import {fetchAndExtractPdfText} from "@/lib/langchain";
import {generateSummaryFromOpenAi} from "@/lib/openAi";

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
             summary = await generateSummaryFromOpenAi(pdfText);
        }catch(error){
            console.log(error);
            //call gemini api if openai fails
        }
        if(!summary){
            return{
                success:false,
                message:'Failed to generate summary',
                data:null,
            };
        }
    }catch(err){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }

}