import { Base } from "../base";
import * as Constants from "../../constants";
import "./aside.scss";
import { getCardsByCategoryName } from "../../functions/getCardsByName";
import { ItemMenu } from "./itemMenu";
import { CardCategory } from "../../interface/cardCategory";

export class Aside extends Base {
  private containerMenu = new Base("ul", ["containerMenu"]);
  private btnItemMenu = new ItemMenu("Main Page");
  private btnStatistics = new ItemMenu("Statistics");
  private btnLogin = new Base("button", ["btnItemLogin"], "Login");
  private cardsArray: ItemMenu[] = [];
  constructor() {
    super("aside");
    this.init();
  }

  init() {
    this.containerMenu.element.append(
      this.btnItemMenu.element,
      this.btnStatistics.element
    );

    this.element.append(this.containerMenu.element);
    this.containerMenu.element.after(this.btnLogin.element);
    this.addItemsMenu();
    this.updateList();

    this.btnLogin.element.addEventListener("click", () => {
      Constants.modalWindow.insertContent(Constants.modalLogin.element);
      Constants.rootContainer.element.append(Constants.modalWindow.element);
    });
  }

  async addItemsMenu() {
    this.cardsArray = [];
    let categories: CardCategory[] = await Constants.server.getCategories();

    categories.forEach((el) => {
      this.cardsArray.push(new ItemMenu(el.name));
    });

    this.cardsArray.forEach((el) => {
      this.containerMenu.element.append(el.element);
    });
  }

  hideAside() {
    //toogle
    if (this.element.classList.contains("activeAside")) {
      this.element.classList.remove("activeAside");
    }
  }

  updateList() {
    this.btnItemMenu.element.classList.remove("activePage");
    this.btnStatistics.element.classList.remove("activePage");
    switch (Constants.currenPage.page) {
      case Constants.pages.main:
        this.btnItemMenu.element.classList.add("activePage");
        break;
      case Constants.pages.statistics:
        this.btnStatistics.element.classList.add("activePage");
        break;
    }

    this.cardsArray.forEach((el) => {
      if (el.tittle === Constants.currenPage.page) {
        el.element.classList.add("activePage");
      } else {
        el.element.classList.remove("activePage");
      }
    });
    Constants.rootContainer.updateBtnStart();
  }
}
