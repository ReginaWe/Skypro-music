import { CurrentTrackProvider } from "@/contexts/CurrentTrackProvider";
import Main from "./components/Main/Main";
import Player from "./components/Player/Player";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <CurrentTrackProvider>
          <Main />
          <Player />
        </CurrentTrackProvider>
        <footer className="footer" />
      </div>
    </div>
  );
}
