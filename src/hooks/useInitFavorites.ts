import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getFavoriteTracks } from "../store/features/playlistSlice";


export function useInitFavorites() {
  const dispatch = useAppDispatch()
  const tokens   = useAppSelector((state) => state.auth.tokens)

  useEffect(() => {
    if (tokens.access)
      dispatch(getFavoriteTracks(tokens))
  }, [tokens, dispatch])
}
