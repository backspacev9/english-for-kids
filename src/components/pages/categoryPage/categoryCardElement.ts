import { Base } from "../../base";
import * as Constants from "../../../constants";

export class categoryCardElement extends Base {
  private img = new Base("img");
  private caption = new Base("span");
  private id: number;
  constructor(id: number, caption: string, img: string) {
    super("div", ["categoryCard"]);
    this.id = id;
    this.img.element.setAttribute("src", img);
    this.caption.element.append(caption);
    this.element.append(this.img.element, this.caption.element);
    this.element.addEventListener("click", () => {
      Constants.currenPage.page = caption;
      Constants.cardsPage.addCards(caption);
      Constants.main.insertPage(Constants.cardsPage.element);
    });
  }
}
