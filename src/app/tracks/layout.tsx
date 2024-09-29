import type { Metadata } from "next";

import styles from "../page.module.css"
import Nav from "../components/Nav/Nav";
import Player from "../components/Player/Player";
import SearchBar from "../components/SearchBar/SearchBar";
import Sidebar from "../components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Skypro music",
  description: "Слушай до дыр",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div className={styles.centerblock}>
            <SearchBar />
            {children}
          </div>
          <Sidebar />
        </main>
        <Player />
        <footer className="footer" />
      </div>
    </div>
  );
}
