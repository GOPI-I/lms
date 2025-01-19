import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Authentication middleware
const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId }; // Returning userId for potential use in upload handlers
};

// Define the file router
export const ourFileRouter = {
  // Course Image Upload
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Image upload complete:", file.url); // Log file details
    }),

  // Course Attachment Upload
  courseAttachment: f([
    "text",
    "image",
    "video",
    "audio",
    "pdf",
  ]).middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Attachment upload complete:", file.url); // Log file details
    }),

  // Chapter Video Upload
  chapterVideo: f({
    video: { maxFileSize: "512GB", maxFileCount: 1 },
  }).middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("Video upload complete:", file.url); // Log file details
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;