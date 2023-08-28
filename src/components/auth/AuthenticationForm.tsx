import { Button } from "@/components/ui/button";
import { AuthFormProps } from "@/types/authForm";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { FormLog } from "./FormLog";
import GoogleSignIn from "./GoogleSignIn";

const AuthenticationForm: FC<AuthFormProps> = ({ isRegister }) => {
  return (
    <div className="h-100 relative w-full rounded-md bg-white p-10 shadow-lg">
      <Button
        asChild
        className="absolute right-0 top-2 text-sm transition-all duration-300 hover:text-primary"
        variant="link"
      >
        <Link href="/">
          <ArrowLeftToLine className="mr-2" size={16} />
          Go Back To Home
        </Link>
      </Button>
      <h1 className="mb-2 mt-4 text-xl font-bold leading-tight md:text-2xl">
        {isRegister ? "Register an Account" : "Login to your account"}
      </h1>

      <FormLog isRegister={isRegister} />

      <div className="my-6 grid grid-cols-3 items-center text-gray-500">
        <hr className="border-gray-500" />
        <p className="text-center text-sm">OR</p>
        <hr className="border-gray-500" />
      </div>

      <GoogleSignIn />

      {isRegister ? (
        <p className="mt-8">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Log in
          </Link>
        </p>
      ) : (
        <p className="mt-8">
          Need an account?{" "}
          <Link
            href={"/register"}
            className="font-semibold text-blue-500 hover:text-blue-700"
          >
            Create an account
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthenticationForm;
