"use client"
import UploadFormInput from "@/components/upload/upload-form-input";
import {z} from 'zod';
import {useUploadThing} from "@/utils/uploadthing";
import {toast} from "sonner";

//TODO: Schema validation using zod
const schema = z.object({
    file: z.instanceof(File,{message:'Invalid File'})
        .refine((file) => file.size <= 20 * 1024 * 1024,'File size must be less than 20MB')
        .refine((file) => file.type.startsWith('application/pdf'),'File must be a PDF'),
});

export default function UploadForm(){


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
        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;

        //TODO: validating the file
        const validatedFields = schema.safeParse({file});
        if(!validatedFields.success){
            toast.error(
                "❌ Something Went Wrong",{
                description:validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File',
            });
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
            return;
        }
        toast.info("Processing PDF📄...",{
                description:"Hang tight! Summafy is reading through the document ✨"
            },
        )
        //Parse the PDF using Lang chain
        //summarize the Pdf using AI
        //save the summary to the database
        //redirect to the individual summary page
    };
    return(
        <div className={"flex flex-col gap-8 w-full max-w-2xl mx-auto"}>
            <UploadFormInput onSubmit={handleSubmit}/>
        </div>
    )
}