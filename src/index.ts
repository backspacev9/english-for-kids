import "./style.scss";

import {Aside} from "./components/aside/aside";
import {CategoryPage} from "./components/pages/categoryPage/categoryPage";
import {RootContainer} from "./components/rootContainer/rootContainer";

import {Main} from "./components/main/main";
import {AdminHeader} from "./components/admin/adminHeader";
import {AdminMain} from "./components/admin/adminMain";
import {CategoryAdmin} from "./components/admin/adminPages/categoryAdmin/categoryAdmin";
import {WordAdmin} from "./components/admin/adminPages/wordAdmin/wordAdmin";
import {ContainerCardsAdmin} from "./components/admin/ContainerCards/containerCardsAdmin";
import {Game} from "./components/game";
import {HandleLocalStorage} from "./components/handleLocalStorage";
import {Header} from "./components/header/header";
import {ModalLogin} from "./components/modalWindow/modalLogin";
import {ModalWindow} from "./components/modalWindow/modalWindow";
import {WinningWindow} from "./components/modalWindow/winWindow";
import {CardsPage} from "./components/pages/cardsPage/cardsPage";
import {StatisticsPage} from "./components/pages/statistics/statisticsPage";
import {Server} from "./server";
import NotFoundPage from "./components/pages/notFound";
export const server = new Server();
export const wordAdmin = new WordAdmin();
export const categoryAdmin = new CategoryAdmin();
export const containerCardsAdmin = new ContainerCardsAdmin();
export const adminHeader = new AdminHeader();
export const adminMain = new AdminMain();

export const main = new Main();

export const header = new Header();
export const rootContainer = new RootContainer();
export const aside = new Aside();

export const lsHadle = new HandleLocalStorage();
export const statPage = new StatisticsPage();
export const game = new Game();
export const audio = new Audio();
export const modalWindow = new ModalWindow();
export const winWindow = new WinningWindow();
export const modalLogin = new ModalLogin();

window.onload = () => {
  document.body.append(aside.element, rootContainer.element);
  //document.body.append(main.element);
  //main.insertPage(new CategoryPage().element);
};

const getParamsId = () =>
  window.location.hash ? Number(window.location.hash.match(/[^\id=]\d*$/g)[0]) : null;

// const router = () => {
//   ev.preventDefault();
//   const link = ev.target.href;
//   window.history.pushState({}, "", link);
//   handleLocation();
// };

const handleLocation = async () => {
  const routes = {
    404: new NotFoundPage().element,
    "/": new CategoryPage().element,
    category: getParamsId()
      ? new CardsPage(getParamsId()).element
      : new NotFoundPage("params require").element,
    statistics: new StatisticsPage().element,
  };
  console.log(window.location.hash);

  const path: string = window.location.hash.replace(/\#|\?.+/g, "");
  console.log(path);
  console.log(getParamsId());

  const route = path.length > 0 ? routes[path as keyof typeof routes] : routes["/"] || routes[404];
  console.log(route);

  main.insertPage(route);
};

window.onhashchange = handleLocation;
handleLocation();

//export default handleLocation;
