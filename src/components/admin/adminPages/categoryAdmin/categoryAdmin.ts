import {Base} from "../../../base";
import "./categoryAdmin.scss";

import {ICategory} from "../../../../interface/category";
import {CategoryAdminCard} from "./categoryAdminCard";
import {server} from "../../../..";

export class CategoryAdmin extends Base {
  private btnAddCategory = new Base("div", ["btnAddCategory"]);
  constructor() {
    super("div", ["categoryAdmin"]);

    this.btnAddCategory.element.insertAdjacentHTML(
      "afterbegin",
      `Create new Category
       <div>
       <span></span>
      <span></span>
      </div>`
    );

    this.initCategories();
  }

  async initCategories() {
    let categories: ICategory[] = await server.getCategories();
    categories.forEach((el) => {
      this.element.append(new CategoryAdminCard(el, categories.length).element);
    });

    this.element.append(this.btnAddCategory.element);
  }
}
