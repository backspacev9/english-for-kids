import "./style.scss";
import * as Constants from "./constants";
import { Aside } from "./components/aside/aside";
import { CategoryPage } from "./components/pages/categoryPage/categoryPage";
import { RootContainer } from "./components/rootContainer/rootContainer";

window.onload = () => {
  document.body.append(
    Constants.aside.element,
    Constants.rootContainer.element
  );
  //document.body.append(main.element);
  Constants.main.insertPage(Constants.catPage.element);
};
