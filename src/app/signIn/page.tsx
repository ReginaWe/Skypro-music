"use client";

import styles from "./page.module.css";
import cn from "classnames"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getLogin, getTokens } from "@/store/features/authSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
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
    await dispatch(getLogin(formData));
    await dispatch(getTokens(formData));
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        <div className={styles.modalBlock}>
          <form className={styles.modalForm} action="#">
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
          <button onClick={handleLogIn} className={styles.modalButton}>Войти</button>
          <Link href="#">Зарегистрироваться</Link>
          </form>
          
        </div>
      </div>
    </div>
  );
}
