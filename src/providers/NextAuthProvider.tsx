"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

type TAuthProvider = {
  children: React.ReactNode;
};

export default function NextAuthProvider({ children }: TAuthProvider) {
  return <SessionProvider>{children}</SessionProvider>;
}
