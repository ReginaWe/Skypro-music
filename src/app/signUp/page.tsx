"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSignUp } from "@/store/features/authSlice";
import React, { useEffect, useState } from "react";
import { getTokens } from "../api/auth";

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { user, tokens } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    dispatch(getTokens(formData))
  }, [user, user._id])

  async function handleRegister(event: React.MouseEvent) {
    dispatch(getSignUp(formData));
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
      <input onChange={handleInputChange} name="email" type="email" />
      <input onChange={handleInputChange} name="password" type="password" />
      <input onChange={handleInputChange} name="username" type="text" />
      <button onClick={handleRegister}>Зарегистрироваться</button>
    </>
  );
}
