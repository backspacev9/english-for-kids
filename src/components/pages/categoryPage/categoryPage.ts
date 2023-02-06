import {Base} from "../../base";
import {categoryCardElement} from "./categoryCardElement";
import {currenPage, pages} from "../../../constants";
import "./categoryPage.scss";
import {ICategory} from "../../../interface/category";
import {rootContainer, server} from "../../..";

export class CategoryPage extends Base {
  private categoriesArray: categoryCardElement[] = [];
  constructor() {
    super("div", ["categoryPage"]);
    this.init();
  }

  async init() {
    currenPage.page = pages.main;
    await this.addCategory();
    console.log("cat page");
  }

  async addCategory() {
    this.element.innerHTML = "";
    rootContainer.updateBtnStart();
    let categories: ICategory[] = await server.getCategories();
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
