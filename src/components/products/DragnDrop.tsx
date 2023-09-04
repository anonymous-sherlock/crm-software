"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import DummyUploadImg from "@/assets/upload.png";

interface DragAndDropProps {}

const DragAndDrop: React.ForwardRefRenderFunction<any, DragAndDropProps> = (
  props,
  ref
) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
  const {
    register,
    setValue,
    getValues,
    setError,
    trigger,
    getFieldState,
    watch,
  } = useFormContext();

  useEffect(() => {
    console.log("files: ", files);
    setValue("images", files);
    console.log("files", getValues());
  }, [files]);

  function handleChange(e: any) {
    e.preventDefault();
    console.log("File has been added");
    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  }

  async function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    console.log(getFieldState("gallerySingleImage").invalid);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        watch("gallerySingleImage");
        setValue("gallerySingleImage", e.dataTransfer.files[i]);
        await trigger("gallerySingleImage");

        if (!getFieldState("gallerySingleImage").invalid) {
          console.log(e.dataTransfer.files[i]);
          setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
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
      {getFieldState("gallerySingleImage").invalid && (
        <div>
          <p>{getFieldState("gallerySingleImage").error?.message}</p>
        </div>
      )}
      {files.length < 0 && (
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
      <div className="grid w-full grid-cols-3 gap-4 p-3 ">
        {files.map((file: any, idx: any) => (
          <div
            key={idx}
            className="group relative w-full rounded-md bg-gray-100 pb-[100%]"
          >
            <Image
              width={400}
              height={400}
              src={URL.createObjectURL(file)}
              alt="cover"
              className="absolute h-full w-full object-cover"
            />
            <span
              className={cn(
                "absolute right-0 top-2 hidden h-8 w-8 -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-destructive group-hover:flex"
              )}
              onClick={() => removeFile(file.name, idx)}
            >
              <Trash width={"50%"} color="white" />
            </span>
          </div>
        ))}
        {files.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DragAndDrop);
