"use client";

import Image from "next/image";
import styles from "./Nav.module.css";
import Menu from "../Menu/Menu";
import { useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Link className={styles.logo} href="/tracks/">
          <Image
            className={styles.logoImage}
            src="/img/logo.png"
            alt="SkyPro Logo"
            width={114}
            height={17}
          />
        </Link>
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
