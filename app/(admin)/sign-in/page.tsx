"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pss, setPss] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function cancelSession() {
      await signOut({
        redirect: false,
      });
      await router.refresh();
      console.log("removed");
    }

    cancelSession();
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    const login = await signIn("credentials", {
      email,
      pss,
      redirect: false,
    });

    if (login?.ok) {
      toast.success("Accesso eseguito correctamente");
      await setTimeout(() => {
        window.location.assign("/admin/");
      }, 200)
    } else {
      toast.error("Credenziali sbagliate");
    }

    setLoading(false);
    setPss("");
    setEmail("");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-50">
      <div className="h-auto xl:w-1/3 lg:w-2/4 sm:w-3/4 w-full p-14 bg-white shadow-xl rounded-2xl">
        <div className="h-full w-full flex flex-col ">
          <div className="text-center border-b border-textDesign pb-5">
            <h1 className="h1Desktop">Intraform</h1>
          </div>
          <div className="space-y-8 py-9">
            <div>
              <Input
                label="Email"
                value={email}
                onValueChange={(e) => setEmail(String(e.target.value))}
                disabled={loading}
              />
            </div>
            <div>
              <Input
                label="Password"
                value={pss}
                onValueChange={(e) => setPss(String(e.target.value))}
                disabled={loading}
                type="password"
              />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <Button
              disabled={loading}
              onClick={handleLogin}
              width={150}
              height={50}
              animation
            >
              Accedi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
