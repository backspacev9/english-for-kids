import {header, main, stateLS} from "../..";
import {RepositoryPathname} from "../../constants";
import {CardsPage} from "../pages/cardsPage/cardsPage";
import {CategoryPage} from "../pages/categoryPage/categoryPage";
import NotFoundPage from "../pages/notFound";
import {StatisticsPage} from "../pages/statistics/statisticsPage";

const handleLocation = async () => {
  const routes = {
    404: new NotFoundPage().element,
    "/": new CategoryPage().element,
    category: getParamsId()
      ? new CardsPage(getParamsId()).element
      : new NotFoundPage("params require").element,
    statistics: new StatisticsPage().element,
  };

  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const locationPath: string = hash.replace(/\#|\?.+/g, "");

  const route =
    locationPath.length > 0
      ? routes[locationPath as keyof typeof routes] || routes[404]
      : pathname === "/" || pathname === RepositoryPathname
      ? routes["/"]
      : routes[404];
  main.insertPage(route);
  if (locationPath === "category") {
    header.hideSwitcher(false);
  } else header.hideSwitcher(true);
  stateLS.setState({
    isGameMode: false,
    isGameNow: stateLS.getState().isGameNow,
  });
};

const getParamsId = () =>
  window.location.hash ? Number(window.location.hash.match(/[^\id=]\d*$/g)[0]) : null;

export default handleLocation;
