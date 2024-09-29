"use client";

import styles from "./signIn.module.css";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLogin, getTokens } from "@/store/features/authSlice";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  const error = useAppSelector((state) => state.error);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.auth.tokens);
  const [formData, setFormData] = useState({ email: "", password: "" });


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

    try {
      if (!formData.email || !formData.password) {
        alert("Введите данные для входа");
        return;
      }
      await Promise.all([
        dispatch(getLogin(formData)).unwrap(),
        dispatch(getTokens(formData)).unwrap(),
      ]);
      router.push("/tracks");
    } catch (error: unknown) {
      console.error("error");
    }
  }

  function handleOpenSigningUp() {
    router.replace("/signUp");
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
              name="email"
              value={formData.email}
              type="email"
              onChange={handleChangeFormData}
              placeholder="Почта"
              className={cn(styles.modalInput, styles.gaped)}
            />
            <input
              name="password"
              value={formData.password}
              type="password"
              onChange={handleChangeFormData}
              placeholder="Пароль"
              className={styles.modalInput}
            />
            <p className={styles.error}>{error && error}</p>
            <button
              onClick={handleLogIn}
              className={cn(styles.modalEnter, styles.gaped)}
            >
              Войти
            </button>
            <button className={styles.modalAdditional} onClick={handleOpenSigningUp}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
