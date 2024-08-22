"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import Menu from "../Menu/Menu";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="logo"
          height={114}
          width={17}
        />
      </div>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.navBurger}
      >
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && <Menu />}
    </nav>
  );
};

export default Nav;
