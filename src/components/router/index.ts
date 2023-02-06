import {main} from "../..";
import {CardsPage} from "../pages/cardsPage/cardsPage";
import {CategoryPage} from "../pages/categoryPage/categoryPage";
import NotFoundPage from "../pages/notFound";

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
const routes = {
  404: new NotFoundPage().element,
  "/": new CategoryPage().element,
  //  "/category": new CardsPage(2).element,
};

const router = (ev: HTMLElementEvent<HTMLLinkElement>) => {
  ev.preventDefault();
  const link = ev.target.href;
  window.history.pushState({}, "", link);
  handleLocation();
};

const handleLocation = async () => {
  const path: string = window.location.pathname;
  console.log(path);
  const route = routes[path as keyof typeof routes] || routes[404];
  main.insertPage(route);
  //const html = await fetch(route).then((data) => data.text());
  //document.getElementById("main-page").innerHTML = html;
};

//window.onpopstate = handleLocation;
//handleLocation();

export default router;
