import { getFileExtension } from "@/lib/helpers";
import { z } from "zod";

const singleImageSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  // You can add more validations as needed, e.g., for file type, size, etc.
});

export const productFormSchema = z.object({
  productName: z
    .string({
      required_error: "Product name is required.",
    })
    .nonempty({
      message: "Product name is required.",
    })
    .min(2, {
      message: "Product name must be at least 2 characters.",
    }),
  productPrice: z
    .string({
      required_error: "Product price is required.",
    })
    .nonempty({
      message: "Product price is required.",
    }),

  productDescription: z.string().optional(),
  productCategory: z
    .string({
      required_error: "Product category is required.",
    })
    .refine((value) => !!value, {
      message: "Product category is required.",
    }),
  productQuantity: z
    .string({
      required_error:
        "Product quantity is required. Enter -1 unlimited quantity",
    })
    .regex(/^\d+$/, {
      message: "Product quantity can have number like 46 ",
    }),

  productImages: z
    .array(singleImageSchema)
    .refine((files) => files.length > 0, {
      message: "Add At least one product image.",
    })
    .refine(
      (files) => {
        // For example, you can check file types, sizes, or other criteria.
        return files.every((file) => {
          const extension = getFileExtension(file.name).toLowerCase();
          return ACCEPTED_IMAGE_EXTENSIONS.includes(extension);
        });
      },
      {
        message:
          "Please upload valid image files only .jpg, .jpeg, .png and .webp are acceptable.",
      }
    )
    .refine(
      (files) => {
        // Limit the number of files to a maximum of 5
        return files.length <= 5;
      },
      {
        message: "You can upload a maximum of 5 files.",
      }
    ),
});

export const ACCEPTED_IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "svg"];
