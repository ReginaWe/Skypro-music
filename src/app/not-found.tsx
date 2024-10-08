"use client";
import Image from "next/image";
import styles from "./page.module.css";
import signing from "./signIn/signIn.module.css";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Nav from "./components/Nav/Nav";
import SearchBar from "./components/SearchBar/SearchBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";

export default function NotFound() {
  const router = useRouter();

  function handleRedirectToMain(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    router.push("/tracks");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <SearchBar />
            <div className={styles.error}>
              <h1>404</h1>
              <div className={styles.subtitle}>
                <h2>Страница не найдена</h2>
                <Image
                  src="/img/crying.png"
                  alt="crying"
                  width={52}
                  height={52}
                />
              </div>
              <p>
                Возможно, она была удалена
                <br />
                или перенесена на другой адрес
              </p>
              <button
                className={signing.modalEnter}
                onClick={handleRedirectToMain}
              >
                Вернуться на главную
              </button>
            </div>
          </div>
        </main>
        <Player />
        <footer className="footer" />
      </div>
    </div>
  );
}
