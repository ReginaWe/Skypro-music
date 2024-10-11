import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import Link from "next/link";
import styles from "./Menu.module.css";
import { logOut } from "@/store/features/authSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((store) => store.auth.tokens);

  function handleQuit() {
    dispatch(logOut());
  }
  return (
    <div className={styles.navMenu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/tracks/" className={styles.menuLink}>
            Главное
          </Link>
        </li>
        {tokens.access ? (
          <>
            <li className={styles.menuItem}>
              <Link href="/tracks/favorite/" className={styles.menuLink}>
                Мой плейлист
              </Link>
            </li>
            <li className={styles.menuItem}>
              <Link
                href="/tracks"
                className={styles.menuLink}
                onClick={handleQuit}
              >
                Выйти
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.menuItem}>
            <Link href="/signIn/" className={styles.menuLink}>
              Войти
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
