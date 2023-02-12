import {Base} from "../../base";
import {categoryCardElement} from "./categoryCardElement";
import {currenPage, pages} from "../../../constants";
import "./categoryPage.scss";
import {ICategory} from "../../../interface/category";
import {main, rootContainer, server} from "../../..";
import Loading from "../../loading";

export class CategoryPage extends Base {
  private categoriesArray: categoryCardElement[] = [];
  private loadingEl = new Loading("loading categories..");
  constructor() {
    super("div", ["categoryPage"]);
    this.init();
  }

  async init() {
    await this.addCategory();
  }

  async addCategory() {
    this.element.innerHTML = "";

    this.element.append(this.loadingEl.element);
    rootContainer.updateBtnStart();
    let categories: ICategory[] = await server.getCategories();
    categories.forEach((el) => {
      this.categoriesArray.push(new categoryCardElement(el.id, el.name, el.imagesrc));
    });
    this.loadingEl.element.remove();
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
