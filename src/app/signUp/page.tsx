"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSignUp, getTokens } from "@/store/features/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (tokens.access) {
      router.replace("/");
    }
  }, [tokens, tokens.access]);

  async function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(getSignUp(formData));
    await dispatch(getTokens(formData));
  }
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  return (
    <>
      <input
        onChange={handleInputChange}
        name="email"
        type="email"
        value={formData.email}
      />
      <input
        onChange={handleInputChange}
        name="password"
        type="password"
        value={formData.password}
      />
      <input
        onChange={handleInputChange}
        name="username"
        type="text"
        value={formData.username}
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </>
  );
}
