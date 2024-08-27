import Sidebar from "../Sidebar/Sidebar";
import Image from "next/image";
import styles from "./Main.module.css";
import Nav from "../Nav/Nav";
import { CenterBlock } from "../CenterBlock/CenterBlock";

const Main = () => {
  return (
    <main className={styles.main}>
      <Nav />
      <CenterBlock />
      <Sidebar />
    </main>
  );
};

export default Main;
