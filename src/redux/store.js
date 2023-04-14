import { configureStore } from "@reduxjs/toolkit";
import { PlayerPlaylistReducer } from "./PlayerPlaylistReducer";
import { PlaylistsReducer } from "./PlaylistsReducer";
import { FavoritesReducer } from "./FavoritesReducer";

export const sstore = configureStore({
  reducer: {
    PlayerPlaylist: PlayerPlaylistReducer,
    Playlist: PlaylistsReducer,
    Favorites: FavoritesReducer,
  },
});