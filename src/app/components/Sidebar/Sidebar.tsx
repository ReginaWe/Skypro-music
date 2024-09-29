"use client";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { useInitFavorites } from "@/hooks/useInitFavorites";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logOut } from "@/store/features/authSlice";

const Sidebar = () => {
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
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </a>
          </div>
          <div className={styles.sidebarItem}>
            <a className={styles.sidebarLink} href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                height={150}
                width={250}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
