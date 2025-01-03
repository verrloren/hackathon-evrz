import { AuthSphere } from "@/components/authUI/auth-sphere";
import RegisterForm from "@/components/authUI/register-form";
import { Suspense } from "react";

export default async function LoginPage() {

  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">


			<AuthSphere />

      <Suspense>
        <RegisterForm />
      </Suspense>


    </main>
  );
}
