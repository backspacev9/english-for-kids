import {Header} from "./components/header/header";
import {Main} from "./components/main/main";
import {Aside} from "./components/aside/aside";
import {CategoryPage} from "./components/pages/categoryPage/categoryPage";
import {CardsPage} from "./components/pages/cardsPage/cardsPage";
import {RootContainer} from "./components/rootContainer/rootContainer";
import {ModalWindow} from "./components/modalWindow/modalWindow";
import {WinningWindow} from "./components/modalWindow/winWindow";
import {Game} from "./components/game";
import {HandleLocalStorage} from "./components/handleLocalStorage";
import {StatisticsPage} from "./components/pages/statistics/statisticsPage";
import {ModalLogin} from "./components/modalWindow/modalLogin";
import {AdminMain} from "./components/admin/adminMain";
import {AdminHeader} from "./components/admin/adminHeader";
import {ContainerCardsAdmin} from "./components/admin/ContainerCards/containerCardsAdmin";
import {CategoryAdmin} from "./components/admin/adminPages/categoryAdmin/categoryAdmin";
import {WordAdmin} from "./components/admin/adminPages/wordAdmin/wordAdmin";
import {Server} from "./server";

export const path = {
  starWin: "./img/star-win.svg",
  starLoose: "./img/star.svg",
  repeatBtn: "./img/repeat.svg",
  failEnd: "./img/failure.jpg",
  successEnd: "./img/success.jpg",
  rightAnswer: "./audio/correct.mp3",
  wrongAnswer: "./audio/error.mp3",
  failSound: "./audio/failure.mp3",
  succesSound: "./audio/success.mp3",
};
export const pathIcons = {
  noImage: "./img/no-pictures.png",
};
//export const baseUrl = "http://127.0.0.1:3000/";
export const baseUrl = "https://efk-api.onrender.com/";
export const routPath = {
  cards: "cards",
  cardsByCategory: "cards/category",
  categories: "categories",
  images: "uploads/images",
  audios: "uploads/audios",
  vidios: "uploads/vidios",
  uploads: "uploads",
};

export const statusGame = {
  gameMode: "train",
  isGame: false,
};
export const pages = {
  main: "Main Page",
  statistics: "Statistics",
};
export const currenPage = {page: "Main Page"};
export const DELAY_OF_MODAL = 3000;
export const answerScore = 1;
export const server = new Server();
export const wordAdmin = new WordAdmin();
export const categoryAdmin = new CategoryAdmin();
export const containerCardsAdmin = new ContainerCardsAdmin();
export const adminHeader = new AdminHeader();
export const adminMain = new AdminMain();

export const lsHadle = new HandleLocalStorage();
export const main = new Main();
export const header = new Header();
export const rootContainer = new RootContainer();
export const aside = new Aside();
export const catPage = new CategoryPage();
export const cardsPage = new CardsPage();
export const statPage = new StatisticsPage();
export const game = new Game();
export const audio = new Audio();
export const modalWindow = new ModalWindow();
export const winWindow = new WinningWindow();
export const modalLogin = new ModalLogin();
