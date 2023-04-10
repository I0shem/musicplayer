import { CREATE_NEW_PLAYLIST, DELETE_PLAYLIST } from "./ActionTypes";
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
    default: {
      return state;
    }
  }
};
