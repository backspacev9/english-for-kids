import {Base} from "../../base";
import {IconsPath, currenPage} from "../../../constants";
import {main} from "../../..";
import {CardsPage} from "../cardsPage/cardsPage";

export class categoryCardElement extends Base {
  private id: number;
  constructor(id: number, caption: string, img: string) {
    super("a", ["categoryCard"]);
    this.id = id;
    this.element.setAttribute("href", `#category?id=${id}`);
    this.element.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cat-imgContainer">
        <img src="${img ? img : IconsPath.noImage}" style="${img ? "" : "width:50%; height:50%"}">
      </div>
      <span>${caption}</span>
    `
    );
    this.element.addEventListener("click", () => {
      currenPage.page = caption;
      //cardsPage.addCards(caption);
      main.insertPage(new CardsPage(this.id).element);
    });
  }
}
