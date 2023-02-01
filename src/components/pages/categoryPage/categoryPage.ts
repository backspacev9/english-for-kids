import {Base} from "../../base";
import {categoryCardElement} from "./categoryCardElement";
import * as Constants from "../../../constants";
import "./categoryPage.scss";
import {ICategory} from "../../../interface/category";

export class CategoryPage extends Base {
  private categoriesArray: categoryCardElement[] = [];
  constructor() {
    super("div", ["categoryPage"]);
    this.init();
  }

  async init() {
    Constants.currenPage.page = Constants.pages.main;
    await this.addCategory();
  }

  async addCategory() {
    this.element.innerHTML = "";
    Constants.rootContainer.updateBtnStart();
    let categories: ICategory[] = await Constants.server.getCategories();
    categories.forEach((el) => {
      this.categoriesArray.push(new categoryCardElement(el.id, el.name, el.imagesrc));
    });

    this.categoriesArray.forEach((el) => {
      this.element.append(el.element);
    });
  }

  changeState() {
    this.categoriesArray.forEach((el) => {
      el.element.classList.toggle("activePlay");
    });
  }
}
