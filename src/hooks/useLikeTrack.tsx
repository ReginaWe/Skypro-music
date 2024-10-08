import { dislikeTrack, likeTrack } from "@/app/api/tracks";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setDislikeTrack, setLikeTrack } from "@/store/features/playlistSlice";
import { TrackType } from "@/app/types/tracks";

const useLikeTrack = (currentTrack: TrackType) => {
  const dispatch = useAppDispatch();
  const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
  const tokens = useAppSelector((store) => store.auth.tokens)
  // Получаем состояние лайка из избранных треков
  const isLiked = tokens.access && likedTracks.find((track: TrackType) => track._id === currentTrack._id);

  async function handleLike(event: React.MouseEvent) {
    event.stopPropagation();
    if (!tokens.access || !tokens.refresh) return alert("Вы не авторизованы");
    const action = isLiked ? dislikeTrack : likeTrack;
    try {
      await action({
        trackId: currentTrack._id,
        access: tokens.access,
        refresh: tokens.refresh,
      });
      if (isLiked) {
        dispatch(setDislikeTrack(currentTrack));
      } else {
        dispatch(setLikeTrack(currentTrack));
      }
    } catch (error) {
      throw new Error();
    }
  }
  return { handleLike, isLiked };
};

export default useLikeTrack;
