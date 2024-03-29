import "./style.scss";

import {Aside} from "./components/aside/aside";
import {RootContainer} from "./components/rootContainer/rootContainer";

import {Main} from "./components/main/main";
import {AdminHeader} from "./components/admin/adminHeader";
import {AdminMain} from "./components/admin/adminMain";
import {CategoryAdmin} from "./components/admin/adminPages/categoryAdmin/categoryAdmin";
import {WordAdmin} from "./components/admin/adminPages/wordAdmin/wordAdmin";
import {ContainerCardsAdmin} from "./components/admin/ContainerCards/containerCardsAdmin";
import {Game} from "./components/game";
import {StateLocalStorage} from "./components/handleLocalStorage";
import {Header} from "./components/header/header";
import {ModalLogin} from "./components/modalWindow/modalLogin";
import {ModalWindow} from "./components/modalWindow/modalWindow";
import {WinningWindow} from "./components/modalWindow/winWindow";
import {StatisticsPage} from "./components/pages/statistics/statisticsPage";
import {Server} from "./server";
import handleLocation from "./components/router";

export const server = new Server();
export const wordAdmin = new WordAdmin();
export const categoryAdmin = new CategoryAdmin();
export const containerCardsAdmin = new ContainerCardsAdmin();
export const adminHeader = new AdminHeader();
export const adminMain = new AdminMain();

export const main = new Main();

export const stateLS = new StateLocalStorage();
export const header = new Header();

export const rootContainer = new RootContainer();
export const aside = new Aside();

export const statPage = new StatisticsPage();
export const game = new Game();
export const audio = new Audio();
export const modalWindow = new ModalWindow();
export const winWindow = new WinningWindow();
export const modalLogin = new ModalLogin();
export const state = new StateLocalStorage();

const upServer = () => {
  const timeToUpMinutes = 14; //interval in minutes
  const seconds = timeToUpMinutes * 60;
  setInterval(() => {
    server.getCards();
  }, seconds);
};
document.body.append(aside.element, rootContainer.element);
window.onstorage = () => {
  rootContainer.updateBtnStart();
  upServer();
};

window.onhashchange = () => handleLocation();
handleLocation();
