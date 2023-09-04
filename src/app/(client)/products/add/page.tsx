import { ProductForm } from "@/components/products/ProductForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Adscrush | Add Product",
  description: "",
};

export default function Page() {
  return (
    <div className="flex">
      <div className="flex- w-full">
        <ProductForm />
      </div>
      
    </div>
  );
}
