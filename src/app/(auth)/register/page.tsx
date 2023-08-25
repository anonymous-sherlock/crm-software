import AuthForm from "@/components/auth/AuthForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register an Account with Adscrush",
  description: "Best Advertisers in 2023 — Adscrush",
};

export default function AuthenticationPage() {
  return (
    <>
      <section className="relative flex justify-center items-center h-full min-h-screen bg-secondary py-10 md:flex-row lg:h-full lg:py-0">
        {/* for mobile  */}
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover lg:hidden"
        />
        <div className="absolute inset-0 z-0 bg-black opacity-50 lg:hidden"></div>
        {/* for desktop */}
        <div
          id=""
          className="self-stretch inset-0 hidden fixed h-screen  w-full items-stretch bg-indigo-600 md:w-1/2 lg:flex xl:w-[50%]"
        >
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-0 bg-black opacity-50"></div>
          <p className="absolute left-4 top-4 text-3xl font-extrabold text-white">
            Adscrush
          </p>
        </div>

        <div className="relative z-40 flex h-full w-full items-center justify-end px-6 max-lg:mx-auto lg:ml-auto md:w-1/2 md:max-w-md lg:max-w-full lg:py-10 lg:px-16 xl:w-[50%] xl:px-12">
          <AuthForm isRegister={true} />
        </div>
      </section>
    </>
  );
}
