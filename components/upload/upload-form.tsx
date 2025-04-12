"use client"
import UploadFormInput from "./upload-form-input";
import z from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import {toast} from "sonner";
import { generatePDFSummary,storePDFSummary } from "@/actions/upload-actions";
import {useRef, useState} from "react";
import {useRouter} from "next/navigation";

//TODO: Schema validation using zod
const schema = z.object({
    file: z.instanceof(File,{message:'Invalid File'})
        .refine((file) => file.size <= 20 * 1024 * 1024,'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'),'File must be a PDF'),
});

export default function UploadForm(){

    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const {startUpload , routeConfig} = useUploadThing(
        'pdfUploader',{
            onClientUploadComplete:() => {
                toast.success(`File Uploaded Successfully!`)
            },
            onUploadError:(err) => {
                toast.error(
                    "Error occurred while uploading",{
                        description:err.message
                    },
                )
            },
            onUploadBegin:(data) => {
                console.log("Upload has begun for",data);
            },
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            // Validate the file
            const validatedFields = schema.safeParse({file});
            if(!validatedFields.success){
                toast.error(
                    "❌ Something Went Wrong",{
                        description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File',
                    });
                setIsLoading(false);
                return;
            }

            toast.info("Uploading PDF📄...",{
                description: "We are uploading your PDF"
            });

            // Upload the file to uploadThing
            const uploadResponse = await startUpload([file]);
            if(!uploadResponse){
                toast.warning("Something Went Wrong!",{
                    description: "Please use a different File"
                });
                setIsLoading(false);
                return;
            }

            toast.info("Processing PDF📄...",{
                description: "Hang tight! Summafy is reading through the document ✨"
            });

            const uploadedFileUrl = uploadResponse[0].serverData.fileUrl;

            // Generate the summary
            const result = await generatePDFSummary({
                fileUrl:uploadResponse[0].serverData.fileUrl,
                fileName:file.name,
            });
            const {data = null} = result || {};

            if(data?.summary){
                toast.info("Saving PDF📄...",{
                    description: "Hang tight! Summafy is saving your summary ✨"
                });

                // Save to the database and wait for completion
                const storedResult = await storePDFSummary({
                    fileUrl: uploadedFileUrl,
                    summary: data.summary,
                    title: data.title,
                    fileName: file.name,
                });

                if(storedResult?.success && storedResult.data?.id) {
                    toast.success("✨ Summary generated!",{
                        description: 'Your PDF has been successfully summarized and saved',
                    });
                    formRef.current?.reset();

                    // Add slight delay to ensure data is committed
                    await new Promise(resolve => setTimeout(resolve, 500));
                    router.push(`/dashboard`);
                    router.refresh(); // Force refresh the route
                } else {
                    throw new Error('Failed to save summary');
                }
            }
        } catch(error) {
            console.error("Error occurred",error);
            toast.error("Failed to process summary");
            formRef.current?.reset();
        } finally {
            setIsLoading(false);
        }
    };    return(
        <div className={"flex flex-col gap-8 w-full max-w-2xl mx-auto"}>
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
        </div>
    )
}