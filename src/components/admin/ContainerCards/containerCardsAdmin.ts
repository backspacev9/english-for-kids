import { Base } from "../../base";
import "./containerCardsAdmin.scss";
import * as Constants from "../../../constants";
export class ContainerCardsAdmin extends Base {
  constructor() {
    super("div", ["containerCardsAdmin"]);
    this.insertPage(Constants.categoryAdmin.element);
  }

  private clear() {
    this.element.innerHTML = "";
  }
  insertPage(page: HTMLElement) {
    this.clear();
    this.element.append(page);
  }
}
