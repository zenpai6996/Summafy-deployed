"use client"
import UploadFormInput from "@/components/upload/upload-form-input";
import {z} from 'zod';
import {useUploadThing} from "@/utils/uploadthing";
import {toast} from "sonner";
import {generatePDFSummary} from "@/actions/upload-actions";
import {useRef, useState} from "react";

//TODO: Schema validation using zod
const schema = z.object({
    file: z.instanceof(File,{message:'Invalid File'})
        .refine((file) => file.size <= 20 * 1024 * 1024,'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'),'File must be a PDF'),
});

export default function UploadForm(){

    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    
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
            onUploadBegin:({file}) => {
                console.log("Upload has begun for",file);
            },
        }
    );

    const handleSubmit=async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);
            const file = formData.get('file') as File;

            //TODO: validating the file
            const validatedFields = schema.safeParse({file});
            if(!validatedFields.success){
                toast.error(
                    "❌ Something Went Wrong",{
                        description:validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File',
                    });
                setIsLoading(false);
                return;
            }
            toast.info("Uploading PDF📄...",{
                    description:"We are uploading you PDF"
                },
            )

            //TODO: Upload the file to uploadThing
            const resp = await startUpload([file]);
            if(!resp){
                toast.warning("Something Went Wrong!",{
                    description:"Please use a different File"
                })
                setIsLoading(false);
                return;
            }
            toast.info("Processing PDF📄...",{
                    description:"Hang tight! Summafy is reading through the document ✨"
                },
            )
            setIsLoading(false);
            //TODO: Parse the PDF using Lang chain
            const result = await generatePDFSummary(resp);


            const {data = null  , message =null} = result || {}

            if(data){
                toast.info("Saving PDF📄...",{
                        description:"Hang tight! Summafy is saving your summary ✨"
                    },
                );
                if(formRef.current){
                    formRef.current?.reset();
                }
                if(data.summary){
                   // save to the database
                }

            }
        }catch(error){
            setIsLoading(false);
           console.error("Error occurred",error);
           formRef.current?.reset();
        }

        //summarize the Pdf using AI
        //save the summary to the database
        //redirect to the individual summary page
    };
    return(
        <div className={"flex flex-col gap-8 w-full max-w-2xl mx-auto"}>
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
        </div>
    )
}