import {main} from "../..";
import {CardsPage} from "../pages/cardsPage/cardsPage";
import {CategoryPage} from "../pages/categoryPage/categoryPage";
import NotFoundPage from "../pages/notFound";

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
};
