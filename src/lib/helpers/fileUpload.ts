"use server"
import fs from "fs";
import { join } from "path";

export async function uploadImage(image: File, path: string = "") {
  if (!image) {
    return;
  }
  const imageBlob = image.slice(0, image.size, image.type);
  // Read the Blob into an ArrayBuffer
  const arrayBuffer = await new Response(imageBlob).arrayBuffer();

  // Convert ArrayBuffer to Buffer (Node.js Buffer)
  const buffer = Buffer.from(arrayBuffer);

  // upload file directory
  let uploadDirectory = join(process.cwd(), "/uploads/", path.toString());

  //   create folder if not exists
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }
  const imagePath = join(uploadDirectory, image.name);
  //   uploading image into directory
  try {
    await fs.promises.writeFile(imagePath, buffer);
  } catch (error) {
    return error;
  }
  return imagePath;
}


