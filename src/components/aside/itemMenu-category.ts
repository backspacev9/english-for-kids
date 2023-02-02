import {ItemMenu} from "./itemMenu";
import {main} from "../../constants";
import {CardsPage} from "../pages/cardsPage/cardsPage";
import {ICategory} from "../../interface/category";

export default class ItemMenuCategory extends ItemMenu {
  private category: ICategory;
  constructor(category: ICategory) {
    super();
    this.category = category;
    //
    this.element.innerText = category.name;
    this.element.addEventListener("click", () => {
      main.insertPage(new CardsPage(this.category.id).element);
    });
  }
}
