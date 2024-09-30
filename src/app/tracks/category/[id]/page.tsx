import Filter from "@/app/components/Filter/Filter";
import Playlist from "@/app/components/Playlist/Playlist";
import styles from "../../../page.module.css"
type CategoryProps = {
  params: { id: string };
};

export default function CategoryPage({ params }: CategoryProps) {
  return (
    <>
      <h2 className={styles.centerblockH2}>Треки {params.id}</h2>
      {/* <Filter tracks={tracks} />
      <Playlist tracks={tracks} /> */}
    </>
  );
}
