import {ItemMenu} from "./itemMenu";
import {CardsPage} from "../pages/cardsPage/cardsPage";
import {ICategory} from "../../interface/category";

import {Base} from "../base";

export default class ItemMenuCategory extends ItemMenu {
  private category: ICategory;

  constructor(category: ICategory) {
    super();
    this.category = category;
    //

    this.element.innerText = category.name;
    //this.element.append(this.link.element)
    // this.element.addEventListener("click", () => {
    //   router.navigateTo(`category/${category.id}`);
    //   //main.insertPage(new CardsPage(this.category.id).element);
    // });
  }
}
window.onpopstate;
