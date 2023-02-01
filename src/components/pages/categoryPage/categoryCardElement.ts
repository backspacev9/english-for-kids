import {Base} from "../../base";
import {pathIcons, currenPage, cardsPage, main} from "../../../constants";

export class categoryCardElement extends Base {
  private id: number;
  constructor(id: number, caption: string, img: string) {
    super("div", ["categoryCard"]);
    this.id = id;

    this.element.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cat-imgContainer">
        <img src="${img ? img : pathIcons.noImage}" style="${img ? "" : "width:50%; height:50%"}">
      </div>
      <span>${caption}</span>
    `
    );
    this.element.addEventListener("click", () => {
      currenPage.page = caption;
      cardsPage.addCards(caption);
      main.insertPage(cardsPage.element);
    });
  }
}
