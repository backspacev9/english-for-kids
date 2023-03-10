import {categoryAdmin} from "../../..";
import {Base} from "../../base";
import "./containerCardsAdmin.scss";

export class ContainerCardsAdmin extends Base {
  constructor() {
    super("div", ["containerCardsAdmin"]);
    this.insertPage(categoryAdmin.element);
  }

  private clear() {
    this.element.innerHTML = "";
  }
  insertPage(page: HTMLElement) {
    this.clear();
    this.element.append(page);
  }
}
