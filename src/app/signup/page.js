import React from "react";
import SignupForm from "../../components/SignupForm";

export default function SingupPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-7xl text-primary font-bold mb-5">Sign Up</h1>
      <h2 className="text-xl text-base-content font-bold mb-20">
        and start using today!
      </h2>
      <SignupForm />
    </div>
  );
}
