"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAuthAction>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: UserAuthAction) => {
    console.log("data", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[100%] gap-4 items-center"
    >
      <div className="w-[100%] text-3xl font-semibold tracking-widest mb-2 text-center">
        Buat akun baru
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Nama Lengkap"
          {...register("name")}
          error={errors.name?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type="text"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type={showPassword ? "text" : "password"}
          placeholder="Kata Sandi"
          suffix="Eye"
          onPressSuffix={() => setShowPassword(!showPassword)}
          {...register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className="w-[100%] relative">
        <Input
          className="w-[100%] p-4 rounded-sm"
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Konfirmasi Kata Sandi"
          suffix="Eye"
          onPressSuffix={() =>
            setShowConfirmationPassword(!showConfirmationPassword)
          }
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
        />
      </div>

      <Button
        className={cn("w-[320px] bg-leaf mt-6", hover.shadow)}
        type="submit"
      >
        Buat Akun
      </Button>
    </form>
  );
}

export default SignUpForm;
