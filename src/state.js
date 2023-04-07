import { v4 as uuid } from "uuid";

import image from "./Components/Images/ACDC.jpg";
import image1 from "./Components/Images/Gorillaz.jpg";
import image2 from "./Components/Images/ArcticMonkeys.jpg";
import image3 from "./Components/Images/Rock.png";
import image4 from "./Components/Images/Pop.png";
import image5 from "./Components/Images/HipHop.png";
import image6 from "./Components/Images/Jazz.png";
import image7 from "./Components/Images/Blues.png";
import image8 from "./Components/Images/Classic.png";
import image9 from "./Components/Images/RockLegends.png";
import image10 from "./Components/Images/ClassicLikeNew.png";
import image11 from "./Components/Images/80sPop.png";
import Image1 from "./Components/Images/heart.png";
import Image2 from "./Components/Images/records.jpg";
import Image3 from "./Components/Images/cassets.jpg";

let store = {
  _state: {
    favbandsData: [
      { id: 1, Img: image },
      { id: 2, Img: image1 },
      { id: 3, Img: image2 },
    ],
    musicStyles1: [
      { id: 1, Img: image3, Name: "ROCK" },
      { id: 2, Img: image4, Name: "POP" },
      { id: 3, Img: image5, Name: "HIP HOP" },
      { id: 4, Img: image6, Name: "JAZZ" },
      { id: 5, Img: image7, Name: "BLUES" },
      { id: 6, Img: image8, Name: "CLASSIC" },
    ],
    recommended: [
      { id: 1, image: image9, text: "Rock Legends" },
      { id: 2, image: image10, text: "Classic like New" },
      { id: 3, image: image11, text: "80s Pop" },
    ],
    libraries: [
      { id: 1, Img: Image1, text: "Liked" },
      { id: 2, Img: Image2, text: "MyPlaylist#1" },
      { id: 3, Img: Image3, text: "MyPlaylist#2" },
    ],
    playList: [
      {
        name: "music - 1",
        writer: "react-modern-audio-player",
        img: "https://cdn.pixabay.com/photo/2021/11/04/05/33/dome-6767422_960_720.jpg",
        src: "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3",
        id: 1,
      },
      {
        name: "music - 2",
        writer: "react-modern-audio-player",
        img: "https://cdn.pixabay.com/photo/2021/09/06/16/45/nature-6602056__340.jpg",
        src: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde668d05.mp3",
        id: 2,
      },
      {
        name: "music - 3",
        writer: "react-modern-audio-player",
        img: "https://cdn.pixabay.com/photo/2022/08/29/08/47/sky-7418364__340.jpg",
        src: "https://cdn.pixabay.com/audio/2022/08/03/audio_54ca0ffa52.mp3",
        id: 3,
      },
      {
        name: "music - 4",
        writer: "react-modern-audio-player",
        img: "https://cdn.pixabay.com/photo/2015/09/22/01/30/lights-951000__340.jpg",
        src: "https://cdn.pixabay.com/audio/2022/07/25/audio_3266b47d61.mp3",
        id: 4,
      },
      {
        name: "music - 5",
        writer: "react-modern-audio-player",
        img: "https://cdn.pixabay.com/photo/2022/08/28/18/03/dog-7417233__340.jpg",
        src: "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3",
        id: 5,
      },
    ],
    playerList: [
      {
        name: "",
        artistName: "",
        albumName: "",
        id: "",
        previewURL:
          "https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3",
        imageSrc: "",
      },
    ],
  },
  getState() {
    return this._state;
  },
  dispatch(action) {
    if (action.type === "CREATE-NEW-RECOMMENDED") {
      if (action.newRecommendedImage === "https://picsum.photos/200/200") {
        let newkey = uuid();
        let NewRecommended = {
          id: newkey,
          image:
            "https://rakmarkinc.com/wp-content/uploads/2019/03/Rakmark-46.jpeg",
          text: action.newRecommendedName,
        };
        this._state.recommended.push(NewRecommended);
        console.log(this._state.recommended);
      } else {
        let newkey = uuid();
        let NewRecommended = {
          id: newkey,
          image: action.newRecommendedImage,
          text: action.newRecommendedName,
        };
        this._state.recommended.push(NewRecommended);
        console.log(this._state.recommended);
      }
    } else if (action.type === "CREATE-NEW-PLAYLIST") {
      if (action.newLibraryImg === "") {
        let newkey = uuid();
        let NewLibrary = {
          id: newkey,
          Img: "https://cdn10.phillymag.com/wp-content/uploads/sites/3/2020/09/monthly-playlist.jpg",
          text: action.newLibraryName,
        };
        this._state.libraries.push(NewLibrary);
      } else {
        let newkey = uuid();
        let NewLibrary = {
          id: newkey,
          Img: action.newLibraryImg,
          text: action.newLibraryName,
        };
        this._state.libraries.push(NewLibrary);
      }
    } else if (action.type === "CREATE-NEW-FAVOURITE") {
      if (action.newFavoriteBandImage === "") {
        let newkey = uuid();
        let NewFavorite = {
          id: newkey,
          Img: "https://media.istockphoto.com/id/1255230725/vector/music-band-concert-silhouettes.jpg?s=612x612&w=0&k=20&c=13gs3DSxgDThewsERsL1zOEUvQ4NQjaFGhjo6L6aZnU=",
        };
        this._state.favbandsData.push(NewFavorite);
      } else {
        let newkey = uuid();
        let NewFavorite = {
          id: newkey,
          Img: action.newFavoriteBandImage,
        };
        this._state.favbandsData.push(NewFavorite);
      }
    }
  },
};

export default store;
