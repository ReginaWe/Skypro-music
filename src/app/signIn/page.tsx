"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLogin } from "@/store/features/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTokens } from "../api/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: "", password: "" });

  /* useEffect(() => {
    dispatch(getTokens(formData));
  }, [user, user._id]); */

  useEffect(() => {
    if (tokens.access) {
      router.replace("/");
    }
  }, [tokens, tokens.access]);

  function handleChangeFormData(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleLogIn(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(getLogin(formData));
    await dispatch(getTokens(formData));
  }
  return (
    <>
      <input
        name="email"
        value={formData.email}
        type="email"
        onChange={handleChangeFormData}
      />
      <input
        name="password"
        value={formData.password}
        type="password"
        onChange={handleChangeFormData}
      />
      <button onClick={handleLogIn}>Войти</button>
      <Link href="#">Зарегистрироваться</Link>
    </>
  );
}
