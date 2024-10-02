import Filter from "@/app/components/Filter/Filter";
import Playlist from "@/app/components/Playlist/Playlist";
import styles from "../../../page.module.css"
import { fetchSelectionTracks } from "@/app/api/tracks";
type CategoryProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryProps) {
  const tracksData = await fetchSelectionTracks(params.id)
  return (
    <>
      <h2 className={styles.centerblockH2}>Треки </h2>
      <Filter tracks={tracksData} />
      <Playlist tracks={tracksData} />
    </> 
  );
}
