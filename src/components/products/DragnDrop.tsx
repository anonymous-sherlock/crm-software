"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import DummyUploadImg from "@/assets/upload.png";
import { getFileExtension } from "@/lib/helpers";
import { ACCEPTED_IMAGE_EXTENSIONS } from "@/schema/productSchema";

interface DragAndDropProps {}

const DragAndDrop: React.ForwardRefRenderFunction<any, DragAndDropProps> = (
  props,
  ref
) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    setError,
    trigger,
    getFieldState,
    watch,
  } = useFormContext();

  useEffect(() => {
    // When files change, clear errors for "productImages"
    clearErrors("productImages");
    console.log(files);
    setValue("productImages", files);
  }, [files, setError, setValue]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        const file = e.target.files[i];
        watch("productImages");
        if (!file) {
          return;
        }
        const fileExtension = getFileExtension(file.name).toLowerCase();
        if (ACCEPTED_IMAGE_EXTENSIONS.includes(fileExtension)) {
          // Check if the file extension is in the accepted extensions array
          setFiles((prevState: File[]) => [...prevState, file]);
      
        } else {
          // Handle non-accepted file extensions (show an error, ignore, etc.)
          // For now, we'll just log a message and set an error
          console.log(`Ignoring file with invalid extension: ${file.name}`);
          setError("productImages", {
            type: "validate",
            message: `File ${file.name} are not allowed to upload! only .jpg, .jpeg, .png and .webp are acceptable.`,
          });
        }
      }
    }
  }

  async function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        watch("productImages");
        // Check if the file is an image before adding it
        // clearErrors("productImages");
        setValue("productImages", [...files, file]);
        await trigger("productImages");
        if (!getFieldState("productImages").invalid) {
          console.log(file);
          setFiles((prevState: any) => [...prevState, file]);
        } else {
          // Handle non-image files (show an error, ignore, etc.)
          // For now, we'll just log a message
          console.log(`Ignoring non-image file: ${file.name}`);
        }
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex flex-col items-center justify-center ">
      {!(files.length > 0) && (
        <div
          className={cn(
            "w-full cursor-pointer rounded-lg border-2 border-dashed bg-gray-100 p-2",
            dragActive ? "border-primary bg-gray-200" : ""
          )}
          onClick={openFileExplorer}
        >
          <div
            className={cn(
              `flex min-h-[10rem] w-full flex-col items-center  justify-center p-4 text-center`,
              dragActive ? "border-opacity-100" : "border-opacity-30"
            )}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
          >
            <Image
              src={DummyUploadImg.src}
              alt=""
              width={60}
              height={60}
              draggable="false"
            />

            <p>
              Drag & Drop files or{" "}
              <span className="font-bold text-primary">
                <u>Select files</u>
              </span>{" "}
              to upload
            </p>
          </div>
        </div>
      )}
      <Input
        placeholder="fileInput"
        className="hidden"
        type="file"
        multiple={true}
        ref={inputRef}
        onChange={handleChange}
        accept="image/*"
      />
      {files.length > 0 && (
        <div className="grid w-full grid-cols-3 gap-4 rounded-md border-2 border-solid bg-gray-200 p-2 ">
          {files.map((file: any, idx: any) => (
            <div
              key={idx}
              className="bg-gray-black group relative w-full rounded-md"
              style={{ width: "100%", height: "100px" }}
            >
              <Image
                width={50}
                height={50}
                src={URL.createObjectURL(file)}
                alt="cover"
                className="absolute h-full w-full object-cover transition-transform duration-300"
              />
              <span
                className={cn(
                  "absolute right-0 top-2 hidden h-6 w-6 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-destructive duration-300 group-hover:flex"
                )}
                onClick={() => removeFile(file.name, idx)}
              >
                <Trash width={"50%"} color="white" />
              </span>
            </div>
          ))}
          <div
            className={cn(
              "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-100 p-2 duration-300 hover:border-primary",
              dragActive ? "border-primary bg-gray-200" : ""
            )}
            onClick={openFileExplorer}
            onDragEnter={handleDragEnter}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
          >
            <Image
              src={DummyUploadImg.src}
              alt=""
              width={60}
              height={60}
              draggable="false"
            />
            Upload
          </div>
        </div>
      )}
    </div>
  );
};

export default React.forwardRef(DragAndDrop);
