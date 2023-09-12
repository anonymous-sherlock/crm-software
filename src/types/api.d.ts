// Interface for a success response
export declare interface ImageUploadSuccess {
  success: boolean;
  message: string[];
  data: {
    imageUrls: string[];
    path: string;
  };
}

// Interface for an error response
export declare interface ImageUploadError {
  success: boolean;
  error: string;
}
