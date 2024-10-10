"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { useInitFavorites } from "@/hooks/useInitFavorites";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logOut } from "@/store/features/authSlice";


const Sidebar = React.memo(() => {
  useInitFavorites();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.auth.user.username);
  function handleQuit() {
    dispatch(logOut());
  }
  return (
    <div className={styles.mainSidebar}>
      {username && (
        <div className={styles.sidebarPersonal}>
          <p className={styles.sidebarPersonalName}>{username}</p>
          <div className={styles.sidebarIcon} onClick={handleQuit}>
            <svg>
              <use xlinkHref="img/icon/sprite.svg#logout" />
            </svg>
          </div>
        </div>
      )}
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/2/">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/3/">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </Link>
          </div>
          <div className={styles.sidebarItem}>
            <Link className={styles.sidebarLink} href="/tracks/category/4/">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";
export default Sidebar;
