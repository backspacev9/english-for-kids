import {adminHeader, containerCardsAdmin} from "../..";
import {Base} from "../base";

export class AdminMain extends Base {
  private statusHeader = new Base("span", ["statusHeader"]);
  constructor() {
    super("div", ["adminMain"]);
    this.element.append(
      adminHeader.element,
      this.statusHeader.element,
      containerCardsAdmin.element
    );
    this.setStatusHeader("");
  }

  setStatusHeader(text: string) {
    this.statusHeader.element.insertAdjacentText("afterbegin", `Category: ${text}`);
  }
}
