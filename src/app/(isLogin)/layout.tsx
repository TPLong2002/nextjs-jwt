"use client";
import Nav from "@/components/Nav";
import { accountUser, login } from "@/lib/features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/reduxHooks";
import axios from "axios";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (auth.isAuth) {
    return (
      <div>
        <Nav />
        {children}
      </div>
    );
  } else {
    dispatch(accountUser()).then((res) => {
      if (res?.payload?.isAuth) {
      } else {
        router.push("/login");
      }
    });
  }
}
