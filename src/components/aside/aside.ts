import {Base} from "../base";
import "./aside.scss";
import {getCardsByCategoryName} from "../../functions/getCardsByName";
import {ItemMenu} from "./itemMenu";
import {ICategory} from "../../interface/category";
import ItemMenuCategory from "./itemMenu-category";
import router, {HTMLElementEvent} from "../router";
import {modalLogin, modalWindow, rootContainer, server} from "../..";
import {currenPage, pages} from "../../constants";

export class Aside extends Base {
  private containerMenu = new Base("ul", ["containerMenu"]);
  private btnItemMenu = new ItemMenu("Main Page");
  private btnStatistics = new ItemMenu("Statistics");
  private btnLogin = new Base("button", ["btnItemLogin"], "Login");
  private cardsArray: ItemMenu[] = [];
  private link = new Base("a", [], "asdasdsad");
  constructor() {
    super("aside");
    this.init();
  }

  init() {
    this.containerMenu.element.append(this.btnItemMenu.element, this.btnStatistics.element);
    this.link.element.setAttribute("href", `category`);
    this.element.append(this.containerMenu.element);
    this.containerMenu.element.after(this.btnLogin.element);
    this.addItemsMenu();
    this.updateList();

    this.link.element.addEventListener("load", (ev) => {
      const event = ev as HTMLElementEvent<HTMLLinkElement>;
      router(event);
    });

    this.btnLogin.element.addEventListener("click", () => {
      modalWindow.insertContent(modalLogin.element);
      rootContainer.element.append(modalWindow.element);
    });
  }

  async addItemsMenu() {
    this.cardsArray = [];
    let categories: ICategory[] = await server.getCategories();

    categories.forEach((el) => {
      this.cardsArray.push(new ItemMenuCategory(el));
    });

    this.cardsArray.forEach((el) => {
      console.log(el.element);

      this.containerMenu.element.append(el.element);
    });
    this.containerMenu.element.append(this.link.element);
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
    switch (currenPage.page) {
      case pages.main:
        this.btnItemMenu.element.classList.add("activePage");
        break;
      case pages.statistics:
        this.btnStatistics.element.classList.add("activePage");
        break;
    }

    this.cardsArray.forEach((el) => {
      if (el.tittle === currenPage.page) {
        el.element.classList.add("activePage");
      } else {
        el.element.classList.remove("activePage");
      }
    });

    rootContainer.updateBtnStart();
  }
}
