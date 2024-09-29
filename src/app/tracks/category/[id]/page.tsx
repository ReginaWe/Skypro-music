import Filter from "@/app/components/Filter/Filter";
import styles from "../../page.module.css";
import Playlist from "@/app/components/Playlist/Playlist";

type CategoryProps = {
  params: { id: string };
};

export default function CategoryPage({ params }: CategoryProps) {
  return (
    <>
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracks={tracks} />
      <Playlist tracks={tracks} />
    </>
  );
}
