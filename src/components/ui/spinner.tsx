import { Loader2 } from "lucide-react";
import React from "react";

interface Props {}

const Spinner = () => {
  return (
    <Loader2 className="... mr-3 h-5 w-5 animate-spin"/>
  );
};

export default Spinner;
