import React, {FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordProps {
    passwordType :string
    setPasswordType : Function
}

const PasswordToggle : FC<PasswordProps>= ({passwordType,setPasswordType}) => {
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <span
      className="absolute right-0  top-0 z-10 m-[0px_!important] flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg  bg-gray-300  text-primary  ring-gray-700 transition-all duration-200 hover:bg-primary hover:text-white hover:ring-1"
      onClick={togglePassword}
    >
      {passwordType !== "text" ? (
        <EyeOff className="w-5" />
      ) : (
        <Eye className="w-5" />
      )}
    </span>
  );
};

export default PasswordToggle;
