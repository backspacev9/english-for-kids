import { Base } from "../../base";
import { categoryCardElement } from "./categoryCardElement";
import * as Constants from "../../../constants";
import "./categoryPage.scss";
import { CardCategory } from "../../../interface/cardCategory";

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
    let categories: CardCategory[] = await Constants.server.getCategories();
    categories.forEach((el) => {
      this.categoriesArray.push(
        new categoryCardElement(
          el.id,
          el.name,
          Constants.path.cloudinaryImg.concat(el.image)
        )
      );
    });
    // cards.forEach((cat) => {
    //   this.categoriesArray.push(
    //     new categoryCardElement(cat.category.name, cat.category.immage)
    //   );
    // });
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
