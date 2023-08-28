export interface newUserResponse extends Response {
  success: boolean;
  message: string;
  callback?: string;
  errors?: string
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  };
}
