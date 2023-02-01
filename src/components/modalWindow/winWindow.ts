import { Base } from "../base";
import * as Constants from "../../constants";
import { delay } from "../../functions/delay";

export class WinningWindow extends Base {
  constructor() {
    super("div", ["winningContent"]);
  }

  async showWinModal(errors?: number) {
    this.element.innerHTML = ``;
    if (errors) {
      var err = new Base("span", [], `${errors} errors`);
      var img = new Base("img");
      img.element.setAttribute("src", Constants.path.failEnd);
    } else {
      var err = new Base("span", [], `Wins!`);
      var img = new Base("img");
      img.element.setAttribute("src", Constants.path.successEnd);
    }
    this.element.append(err.element, img.element);
    await delay(Constants.DELAY_OF_MODAL);
    Constants.modalWindow.close();
    Constants.main.insertPage(Constants.catPage.element);
    Constants.currenPage.page = "Main Page";
    Constants.aside.updateList();
    Constants.rootContainer.updateBtnStart();
  }
}
