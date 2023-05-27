import {
  CREATE_NEW_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_LIKED_SONG,
  ADD_TO_LIST,
  DELETE_LIKED_SONG,
  DELETE_FROM_LIST,
} from "./ActionTypes";
import HeartImg from "../Components/Images/heart.png";
import RecordsImg from "../Components/Images/records.jpg";
import CassetsImg from "../Components/Images/cassets.jpg";

const initialState = {
  playlists: [
    {
      name: "Liked",
      imageURL: HeartImg,
      tracks: [
        {
          id: "31c2730e64",
          name: "Smoke",
          artistName: "SoulProdMusic",
          albumName: "SoulProdMusic",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/03/19/audio_9311bc02e5.mp3",
          imageSrc:
            "https://cdn.pixabay.com/photo/2014/11/28/19/14/fire-549103_960_720.jpg",
        },
        {
          id: "5d7788ef2d",
          name: "Risk",
          artistName: "StudioKolomna",
          albumName: "StudioKolomna",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/01/27/audio_3d61eda8c6.mp3",
          imageSrc:
            "https://cdn.pixabay.com/photo/2015/04/06/10/33/slip-up-709045_960_720.jpg",
        },
        {
          id: "febc508520",
          name: "The Tropical Summer",
          artistName: "Oleg Kirilkov",
          albumName: "Music For Videos",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/04/03/audio_17cceb0378.mp3",
          imageSrc:
            "https://cdn.pixabay.com/photo/2015/10/30/20/13/sunrise-1014712_960_720.jpg",
        },
        {
          id: "56e9fe2cc0",
          name: "Coffee Lounge",
          artistName: "Oleg Kirilkov",
          albumName: "Chill Town",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/04/03/audio_6ae388992a.mp3",
          imageSrc:
            "https://cdn.pixabay.com/photo/2017/06/20/22/14/man-2425121_960_720.jpg",
        },
      ],
    },
    {
      name: "Name 1",
      imageURL: RecordsImg,
      tracks: [
        {
          id: "31c2730e64",
          name: "Password Infinity",
          artistName: "Evgeny_Bardyuzha",
          albumName: "Infinity",
          previewURL:
            "https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3",
          imageSrc:
            "https://img.freepik.com/free-photo/front-view-password-with-binary-code_23-2148578086.jpg?w=1380&t=st=1680288649~exp=1680289249~hmac=1b39faf37026f1c0f92dd0a829ab07b025dbdfb995b1e0859e12a9ad0f3e8cb7",
        },
        {
          id: "5d7788ef2d",
          name: "Modern Vlog",
          artistName: "penguinmusic",
          albumName: "Penguin",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/02/27/audio_5d7788ef2d.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/pinguin_53876-57854.jpg?w=826&t=st=1680288604~exp=1680289204~hmac=9b6a53dfd83b4026c0728259cbf093383276a73d6792f553cbdf0f573fad8df7",
        },
        {
          id: "febc508520",
          name: "Lifelike",
          artistName: "AlexiAction",
          albumName: "Life",
          previewURL:
            "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/colorful-equalizer-wave-background_52683-33072.jpg?w=1380&t=st=1680288562~exp=1680289162~hmac=c1e97495f84dc4b173c75f54d96b41d787cb0799f955c819a253374ee67d7c0e",
        },
        {
          id: "56e9fe2cc0",
          name: "Retro Funk",
          artistName: "SoulProdMusic",
          albumName: "Funk",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/03/21/audio_56e9fe2cc0.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/funk-music-festival-poster-template_23-2148491615.jpg?w=826&t=st=1680288481~exp=1680289081~hmac=fd19c7ead042bbe993fe62aee96acbe600c4574f5dd65a8c3abacf099fd3fdd9",
        },
      ],
    },
    {
      name: "Name 2",
      imageURL: CassetsImg,
      tracks: [
        {
          id: "31c2730e64",
          name: "Password Infinity",
          artistName: "Evgeny_Bardyuzha",
          albumName: "Infinity",
          previewURL:
            "https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3",
          imageSrc:
            "https://img.freepik.com/free-photo/front-view-password-with-binary-code_23-2148578086.jpg?w=1380&t=st=1680288649~exp=1680289249~hmac=1b39faf37026f1c0f92dd0a829ab07b025dbdfb995b1e0859e12a9ad0f3e8cb7",
        },
        {
          id: "5d7788ef2d",
          name: "Modern Vlog",
          artistName: "penguinmusic",
          albumName: "Penguin",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/02/27/audio_5d7788ef2d.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/pinguin_53876-57854.jpg?w=826&t=st=1680288604~exp=1680289204~hmac=9b6a53dfd83b4026c0728259cbf093383276a73d6792f553cbdf0f573fad8df7",
        },
        {
          id: "febc508520",
          name: "Lifelike",
          artistName: "AlexiAction",
          albumName: "Life",
          previewURL:
            "https://cdn.pixabay.com/audio/2022/11/22/audio_febc508520.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/colorful-equalizer-wave-background_52683-33072.jpg?w=1380&t=st=1680288562~exp=1680289162~hmac=c1e97495f84dc4b173c75f54d96b41d787cb0799f955c819a253374ee67d7c0e",
        },
        {
          id: "56e9fe2cc0",
          name: "Retro Funk",
          artistName: "SoulProdMusic",
          albumName: "Funk",
          previewURL:
            "https://cdn.pixabay.com/audio/2023/03/21/audio_56e9fe2cc0.mp3",
          imageSrc:
            "https://img.freepik.com/free-vector/funk-music-festival-poster-template_23-2148491615.jpg?w=826&t=st=1680288481~exp=1680289081~hmac=fd19c7ead042bbe993fe62aee96acbe600c4574f5dd65a8c3abacf099fd3fdd9",
        },
      ],
    },
  ],
};

export const PlaylistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_PLAYLIST: {
      return {
        ...state,
        playlists: [...state.playlists, action.newLibrary],
      };
    }
    case DELETE_PLAYLIST: {
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist !== action.delLibrary
        ),
      };
    }
    case ADD_LIKED_SONG: {
      return {
        ...state,
        playlists: state.playlists.map((playlist, index) => {
          if (index === 0) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, action.LikedSong],
            };
          }
          return playlist;
        }),
      };
    }
    case ADD_TO_LIST: {
      return {
        ...state,
        playlists: state.playlists.map((playlist, index) => {
          if (index === action.index) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, action.newSong],
            };
          }
          return playlist;
        }),
      };
    }
    case DELETE_LIKED_SONG: {
      return {
        ...state,
        playlists: state.playlists.map((playlist, i) => {
          if (i === 0) {
            return {
              ...playlist,
              tracks: playlist.tracks.filter(
                (track, index) => track.id !== action.LikedSongID
              ),
            };
          }
          return playlist;
        }),
      };
    }
    case DELETE_FROM_LIST: {
      return {
        ...state,
        playlists: state.playlists.map((playlist, i) => {
          if (i === action.playlistID) {
            return {
              ...playlist,
              tracks: playlist.tracks.filter(
                (track, index) => track.id !== action.songID
              ),
            };
          }
          return playlist;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
