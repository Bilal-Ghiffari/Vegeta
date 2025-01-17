"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "@/services/auth";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type UserAuthAction = {
  name: string;
  email: string;
  password: string;
  confirm_password: string | undefined;
};

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match!"),
});

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthAction>({
    resolver: yupResolver(schema),
  });

  const [registerMutation] = useRegisterMutation();
  const onSubmit = async (data: UserAuthAction) => {
    try {
      const res = await registerMutation(data).unwrap();
      console.log("res SignUp", res);
      if (res.success) {
        const user = await signIn("credentials", {
          name: data.name,
          email: data.email,
          password: data.password,
          callbackUrl: searchParams.get("callbackUrl") || "/",
          redirect: false,
        });
        router.push(user?.url || "/");
      } else {
        toast({
          title: "Something went wrong",
          description: "Please check your email and password",
          variant: "destructive",
          duration: 2000,
        });
      }
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.data.message,
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] space-y-3"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>

      <Input
        className="w-[100%]"
        type="text"
        placeholder="Nama Lengkap"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        className="w-[100%]"
        type="text"
        placeholder="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        className="w-[100%]"
        type={showPassword ? "text" : "password"}
        placeholder="Kata Sandi"
        suffix="Eye"
        onPressSuffix={() => setShowPassword(!showPassword)}
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        className="w-[100%]"
        type={showConfirmationPassword ? "text" : "password"}
        placeholder="Konfirmasi Kata Sandi"
        suffix="Eye"
        onPressSuffix={() =>
          setShowConfirmationPassword(!showConfirmationPassword)
        }
        {...register("confirm_password")}
        error={errors.confirm_password?.message}
      />

      <Button
        className={cn("w-[320px] bg-leaf mt-6 mx-auto", hover.shadow)}
        type="submit"
      >
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
