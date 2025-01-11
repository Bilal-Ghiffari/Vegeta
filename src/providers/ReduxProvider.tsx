"use client";

import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

type TReduxProvider = {
  children: React.ReactNode;
};

export default function ReduxProvider({ children }: TReduxProvider) {
  return <Provider store={store}>{children}</Provider>;
}
