"use client";
import RegisterForm from "@/components/register-form";

export default function Register() {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      <RegisterForm />
    </div>
  );
}
