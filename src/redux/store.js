import { configureStore } from "@reduxjs/toolkit";
import { PlayerPlaylistReducer } from "./PlayerPlaylistReducer";
import { PlaylistsReducer } from "./PlaylistsReducer";

export const sstore = configureStore({
  reducer: {
    PlayerPlaylist: PlayerPlaylistReducer,
    Playlist: PlaylistsReducer,
  },
});
