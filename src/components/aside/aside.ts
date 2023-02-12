import {Base} from "../base";
import "./aside.scss";
import {getCardsByCategoryName} from "../../functions/getCardsByName";
import {ItemMenu} from "./itemMenu";
import {ICategory} from "../../interface/category";
//import ItemMenuCategory from "./itemMenu-category";

import {modalLogin, modalWindow, rootContainer, server} from "../..";

export class Aside extends Base {
  private containerMenu = new Base("ul", ["containerMenu"]);
  private btnItemMenu = new ItemMenu("Main Page","/");
  private btnStatistics = new ItemMenu("Statistics","/statistics");
  private btnLogin = new Base("button", ["btnItemLogin"], "Login");
  private cardsArray: ItemMenu[] = [];
  constructor() {
    super("aside");
    this.init();
  }

  async init() {
    this.containerMenu.element.append(this.btnItemMenu.element, this.btnStatistics.element);

    this.element.append(this.containerMenu.element);
    this.containerMenu.element.after(this.btnLogin.element);
    await this.addItemsMenu();
    this.updateList();


    this.btnLogin.element.addEventListener("click", () => {
      modalWindow.insertContent(modalLogin.element);
      rootContainer.element.append(modalWindow.element);
    });
  }

  async addItemsMenu() {
    this.cardsArray = [];
    let categories: ICategory[] = await server.getCategories();

    categories.forEach((el) => {
      this.cardsArray.push(new ItemMenu(el.name,`/category?id=${el.id}`,el.id));
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

  public updateList() {
    const id = Number(new URLSearchParams(window.location.search).get('id'))
    console.log(id);
    
    this.btnItemMenu.element.classList.remove("activePage");
    this.btnStatistics.element.classList.remove("activePage");

    switch (window.location.pathname) {
      case '/':
        this.btnItemMenu.element.classList.add("activePage");
        break;
      case '/statistics':
        this.btnStatistics.element.classList.add("activePage");
        break;
    }

    this.cardsArray.forEach((el) => {
      
      if (el.id === id) {
        el.element.classList.add("activePage");
      } else {
       el.element.classList.remove("activePage");
      }
    });

    rootContainer.updateBtnStart();
  }
}
