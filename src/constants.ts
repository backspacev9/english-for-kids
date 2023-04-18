import {IStateGame} from "./interfaces";

export const FilePath = {
  rightAnswer: "./audio/correct.mp3",
  wrongAnswer: "./audio/error.mp3",
  failSound: "./audio/failure.mp3",
  succesSound: "./audio/success.mp3",
};
export const IconsPath = {
  noImage: "./icons/no-pictures.png",
  starWin: "./icons/star-win.svg",
  starLoose: "./icons/star.svg",
  repeatBtn: "./icons/repeat.svg",
  startBtn: "./icons/start.svg",
  failEnd: "./icons/failure.jpg",
  successEnd: "./icons/success.jpg",
  loading: "./icons/loading.svg",
};
//export const baseUrl = "http://127.0.0.1:3000/";
export const baseUrl = "https://efk-api.onrender.com/";
export const routPath = {
  cards: "cards",
  cardsByCategory: "cards/category",
  categories: "categories",
  images: "uploads/images",
  audios: "uploads/audios",
  videos: "uploads/vidios",
  uploads: "uploads",
};

//this path was made for correct routing on ghpages
export const RepositoryPathname = "/english-for-kids/";

export const statusGame: IStateGame = {
  isGameMode: false,
  isGameNow: false,
  currentCards: [],
};
export const pages = {
  main: "Main Page",
  statistics: "Statistics",
};
export const currenPage = {page: "Main Page"};
export const DELAY_OF_MODAL = 3000;
export const answerScore = 1;
