"use client";

import styles from "./signUp.module.css";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getSignUp, getTokens, setError } from "@/store/features/authSlice";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { RejectedErrorType } from "../types/user";

export default function SignUp() {
  const error = useAppSelector((state) => state.auth.user.error);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordTwo: "",
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

    if (!formData.email || !formData.password || !formData.passwordTwo) {
      dispatch(
        setError(
          "Вы ничего не ввели, невозможно продолжить запрос с пустыми полями"
        )
      );
      return;
    }
    if (formData.password !== formData.passwordTwo) {
      dispatch(setError("Оба пароля должны совпадать"));
      return;
    }

    try {
      await dispatch(getSignUp(formData)).unwrap();
      await dispatch(getTokens(formData)).unwrap();
      router.push("/tracks");
    } catch (rejectedValueOrSerializedError: unknown) {
      if (rejectedValueOrSerializedError instanceof Error) {
        dispatch(setError(rejectedValueOrSerializedError.message));
      } else if (
        (rejectedValueOrSerializedError as RejectedErrorType).name === "Error"
      ) {
        dispatch(
          setError(
            (rejectedValueOrSerializedError as RejectedErrorType).message
          )
        );
      } else {
        dispatch(setError("Неизвестная ошибка"));
      }
      console.log("error:", rejectedValueOrSerializedError);
    }
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
              name="passwordTwo"
              type="password"
              value={formData.passwordTwo}
              placeholder="Повторите пароль"
              className={styles.modalInput}
            />
            <p className={styles.errorBlock}>{error}</p>
            <button
              className={cn(styles.modalEnter, styles.gaped)}
              type="button"
              onClick={handleRegister}
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
