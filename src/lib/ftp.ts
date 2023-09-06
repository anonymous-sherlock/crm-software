import Jsftp from "jsftp";

export const ftp = new Jsftp({
  host: process.env.FTP_HOST,
  port: Number(process.env.FTP_PORT),
  user: process.env.FTP_USER,
  pass: process.env.FTP_PASS,
});

export async function uploadFileToFTP() {
  return new Promise((resolve, reject) => {
    ftp.put(process.cwd()+ "/public/favicon.png", "/", (err: Error | any) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        console.log("File uploaded successfully");
        resolve({
          message: "File uploaded successfully",
        });
      }
    });
  });
}
