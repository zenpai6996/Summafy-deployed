import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser, getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import {UploadThingError} from 'uploadthing/server';


const f = createUploadthing();



export const ourFileRouter = {
    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
        .middleware(async ({ req }) => {
            const user = await currentUser()

            if (!user) throw new UploadThingError("Unauthorized");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload completed for user", metadata.userId);
            console.log("File url", file.url);
            return {
                userId: metadata.userId,
                fileUrl: file.url,
                fileName: file.name,
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;