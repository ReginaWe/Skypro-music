import Filter from "@/app/components/Filter/Filter";
import Playlist from "@/app/components/Playlist/Playlist";
import styles from "../../../page.module.css";
import { fetchSelectionTracks } from "@/app/api/tracks";
import { getTracks } from "../../../api/tracks";
import { TrackType } from "@/app/types/tracks";
type CategoryProps = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryProps) {
  const categoryData = await fetchSelectionTracks(params.id);
  const categoryTracks = (await getTracks()).filter((item: TrackType) =>
    categoryData.items.includes(item._id)
  );
  /* export default function CategoryPage({ params }: CategoryProps) {
  const categoryData = [];
  useEffect(() => {
    const tracksData = fetchSelectionTracks("2").then((data) => {
      console.log("object", data);
    });
  }, []);
 */
  return (
    <>
      <h2 className={styles.centerblockH2}>{categoryData.name}</h2>
      <Filter tracks={categoryTracks} />
      <Playlist tracks={categoryTracks} />
    </>
  );
}
