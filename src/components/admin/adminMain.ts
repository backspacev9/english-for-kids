import { Base } from "../base";
import * as Constants from "../../constants";

export class AdminMain extends Base {
  private statusHeader = new Base("span", ["statusHeader"]);
  constructor() {
    super("div", ["adminMain"]);
    this.element.append(
      Constants.adminHeader.element,
      this.statusHeader.element,
      Constants.containerCardsAdmin.element
    );
    this.setStatusHeader("");
  }

  setStatusHeader(text: string) {
    this.statusHeader.element.insertAdjacentText(
      "afterbegin",
      `Category: ${text}`
    );
  }
}
