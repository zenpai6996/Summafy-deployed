'use server';
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromGemini } from "@/lib/geminiAi";
import { generateSummaryFromCohere } from "@/lib/aiService";
import {auth} from "@clerk/nextjs/server";
import { getDbConnection } from "@/lib/db";
import {revalidatePath} from "next/cache";


export function formatFileNameAsTitle(fileName: string): string {
    if (!fileName) return '';

    // Remove file extension
    const withoutExtension = fileName.replace(/\.[^/.]+$/, '');

    // Replace special characters with spaces
    const withSpaces = withoutExtension
        .replace(/[-_]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[^a-zA-Z0-9 ]/g, ' ');

    // Capitalize each word and clean up
    return withSpaces
        .split(' ')
        .filter(word => word.length > 0) // Remove empty strings
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(' ')
        .trim()
        .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}

interface PDFSummaryType {
    userId?:string,
    fileUrl:string,
    summary:string,
    title:string,
    fileName:string
}

export async function generatePDFSummary({fileUrl,fileName}:{fileUrl:string,fileName:string})  {
    if(!fileUrl){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }

    if(!fileUrl){
        return{
            success:false,
            message:'File upload failed',
            data:null,
        };
    }

    try {
        const pdfText = await fetchAndExtractPdfText(fileUrl);
        console.log({pdfText});
        let summary;
        try{
             summary = await generateSummaryFromCohere(pdfText);


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
        const  formattedfileName= formatFileNameAsTitle(fileName);
        return{
            success:true,
            message:'Summary Generated successfully',
            data:{
                title:formattedfileName,
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

async function savePdfSummary({userId,fileUrl,summary,title,fileName}:{userId:string,fileUrl:string,summary:string,title:string,fileName:string}){
    //sql inserting pdf summary
    try{
        const sql = await getDbConnection()
        const [savedSumamry] = await sql `
                insert into pdf_summaries (
                                           user_id,
                                           original_file_url,
                                           summary_text,
                                           title,
                                           file_name
                )values(
                                         ${userId},
                                         ${fileUrl},
                                         ${summary},
                                         ${title},
                                         ${fileName}
                       ) returning id , summary_text`;
        return savedSumamry;
    }catch(error){
        console.error('Error saving PDF summary:',error);
        throw error;
    }
}

export async function storePDFSummary({
                                          fileUrl,
                                          summary,
                                          title,
                                          fileName
                                      }:PDFSummaryType) {

    //user is logged in and has a user id

    //save the pdf summary

    //savePdfSummary()
    try{
        let savedSummary:any;
        const {userId} = await auth();
        if(!userId){
            return{
                success:false,
                message:'User not found',
            };
        }

        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });
        if(!savedSummary){
            return{
                success:false,
                message:'Failed to save summary,Please try again',
            };
        }
    //revalidate the cache
        revalidatePath(`/summaries/${savedSummary.id}`);
        return{
            success:true,
            message:'Summary saved successfully',
            data:{
                id:savedSummary.id,
            }
        };
    }catch(error){
        return{
            success:false,
            message:error instanceof Error ? error.message: 'Failed to save summary',

        }
    }

}