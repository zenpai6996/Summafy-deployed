"use client"
import UploadFormInput from "./upload-form-input";
import z from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary, storePDFSummary } from "@/actions/upload-actions";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

//TODO: Schema validation using zod
const schema = z.object({
  file: z.instanceof(File, { message: 'Invalid File' })
      .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB')
      .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF'),
});

interface UploadFormProps {
  userId: string;
}

export default function UploadForm({ userId }: UploadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLimitReached, setUploadLimitReached] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    plan_id: 'basic' | 'pro';
    uploads_used: number;
    upload_limit: number;
    is_limit_reached: boolean;
  } | null>(null);
  const router = useRouter();

  // Fetch subscription details on component mount
  useEffect(() => {
    async function fetchSubscriptionDetails() {
      try {
        const res = await fetch(`/api/subscription-details?clerkUserId=${userId}&t=${new Date().getTime()}`);
        if (!res.ok) throw new Error('Failed to fetch subscription details');

        const data = await res.json();
        setSubscriptionDetails(data);
        setUploadLimitReached(data.is_limit_reached || data.uploads_used >= data.upload_limit);
      } catch (error) {
        console.error("Failed to fetch subscription details:", error);
        toast.error("Couldn't verify your upload limit");
      }
    }

    if (userId) {
      fetchSubscriptionDetails();
    }
  }, [userId]);

  const { startUpload, routeConfig } = useUploadThing(
      'pdfUploader', {
        onClientUploadComplete: () => {
          toast.success(`File Uploaded Successfully!`)
        },
        onUploadError: (err) => {
          toast.error(
              "Error occurred while uploading", {
                description: err.message
              },
          )
        },
        onUploadBegin: (data) => {
          console.log("Upload has begun for", data);
        },
      }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if upload limit is reached first
    if (uploadLimitReached) {
      toast.error("Upload limit reached", {
        description: "You've reached your monthly upload limit."
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      // Validate the file
      const validatedFields = schema.safeParse({ file });
      if (!validatedFields.success) {
        toast.error(
            " Something Went Wrong ❌", {
              description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File',
            });
        setIsLoading(false);
        return;
      }

      toast.info("Uploading PDF📄...", {
        description: "We are uploading your PDF"
      });

      // Upload the file to uploadThing
      const uploadResponse = await startUpload([file]);
      if (!uploadResponse) {
        toast.warning("Something Went Wrong!", {
          description: "Please use a different File"
        });
        setIsLoading(false);
        return;
      }

      toast.info("Processing PDF📄...", {
        description: "Hang tight! Summafy is reading through the document "
      });

      const uploadedFileUrl = uploadResponse[0].serverData.fileUrl;

      // Generate the summary
      const result = await generatePDFSummary({
        fileUrl: uploadResponse[0].serverData.fileUrl,
        fileName: file.name,
      });
      const { data = null } = result || {};

      if (data?.summary) {
        toast.info("Saving PDF📄...", {
          description: "Hang tight! Summafy is saving your summary "
        });

        // Save to the database and wait for completion
        const storedResult = await storePDFSummary({
          fileUrl: uploadedFileUrl,
          summary: data.summary,
          title: data.title,
          fileName: file.name,
        });

        if (storedResult?.success && storedResult.data?.id) {
          toast.success("Summary generated! ✨", {
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
    } catch (error) {
      console.error("Error occurred", error);
      toast.error("Failed to process summary");
      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className={"flex flex-col gap-8 w-full max-w-2xl mx-auto"}>
        {uploadLimitReached && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 rounded-lg p-4 mb-4">
              <div className="flex justify-center items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <h5 className=" font-semibold">Upload Limit Reached</h5>
              </div>

              {subscriptionDetails?.plan_id === 'basic' && (
                  <Link
                      href="/#pricing"
                      className="mt-2 inline-block no-underline text-purple-300 hover:text-purple-200 "
                  >
                    Upgrade to Pro for more uploads
                  </Link>
              )}
            </div>
        )}

        <UploadFormInput
            isLoading={isLoading}
            isLimitReached={uploadLimitReached}
            ref={formRef}
            onSubmit={handleSubmit}
        />

        {isLoading && (
            <>
              <div className={"relative"}>
                <div className={"absolute inset-0 flex items-center"} aria-hidden={"true"}>
                  <div className={"w-full border-t border-gray-200 dark:border-gray-800"}/>
                </div>
                <div className={"relative flex justify-center"}>
                  <span className={"bg-background px-3 text-muted-foreground text-sm"}> Processing </span>
                </div>
              </div>
            </>
        )}
      </div>
  )
}