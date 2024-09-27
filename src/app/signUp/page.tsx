"use client";

import styles from "./signUp.module.css";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSignUp, getTokens } from "@/store/features/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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

 
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
   async function handleRegister(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    await dispatch(getSignUp(formData));
    await dispatch(getTokens(formData));
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.modalBlock}>
          <form className={styles.modalForm} action="#">
            <Link className={styles.modalLogo} href="/tracks">
              <Image
                src="/img/logo_modal.png"
                alt="logo"
                width={140}
                height={22}
              />
            </Link>
            <input
              onChange={handleInputChange}
              name="email"
              type="email"
              value={formData.email}
              placeholder="Электронная почта"
              className={cn(styles.modalInput, styles.gaped)}
            />
            <input
              onChange={handleInputChange}
              name="password"
              type="password"
              value={formData.password}
              placeholder="Пароль"
              className={cn(styles.modalInput, styles.gaped)}
            />
            <input
              onChange={handleInputChange}
              name="username"
              type="text"
              value={formData.username}
              placeholder="Имя пользоателя"
              className={styles.modalInput}
            />
            <button
              onClick={handleRegister}
              className={cn(styles.modalEnter, styles.gaped)}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
