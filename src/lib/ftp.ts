import { ftpServerConfig } from "@/config/site";
import { Client, FTPResponse } from "basic-ftp";
import { Readable } from "stream";

const ftpClient = new Client();
ftpClient.ftp.verbose = true;

let isConnected = false;

async function connectFTP() {
  if (!isConnected) {
    await ftpClient.access(ftpServerConfig);
    isConnected = true;
  }
}

async function disconnectFTP() {
  if (isConnected) {
    ftpClient.close();
    isConnected = false;
  }
}

async function uploadImageFile(
  bufferStream: Readable,
  fileName: string,
  remotePath: string
) {
  try {
    await connectFTP();
    console.log(
      "Connected to FTP server with credentials:",
      ftpServerConfig.user
    );
    // Normalize the remotePath by removing leading/trailing slashes
    remotePath = remotePath.replace(/^\/+|\/+$/g, "");

    const directoryExists = await directoryExistsOnFTP(remotePath);
    if (!directoryExists) {
      await ftpClient.ensureDir(remotePath);
    }

    // Upload the file
    const remoteFilePath = `${remotePath}/${fileName}`;
    await ftpClient.uploadFrom(bufferStream, remoteFilePath);
    const fullPath = getFullURLPath(remotePath, fileName);
    return { success: true, imagePath: fullPath };
  } catch (err) {
    console.error("FTP Error:", err);
    return { success: false, error: err };
  }
}

async function directoryExistsOnFTP(directoryPath: string): Promise<boolean> {
  try {
    await ftpClient.list(directoryPath);
    // If successful, the directory exists
    return true;
  } catch (error) {
    // If an error occurs, the directory doesn't exist
    return false;
  }
}
function getFullURLPath(remotePath: string, fileName: string): string {
  return `${process.env.CDN_Domain}${remotePath}${fileName}`;
}

export { ftpClient, uploadImageFile, disconnectFTP };
