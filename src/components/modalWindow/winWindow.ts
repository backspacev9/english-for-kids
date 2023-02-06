import {Base} from "../base";

import {delay} from "../../functions/delay";
import {modalWindow, aside, rootContainer} from "../..";
import {path, DELAY_OF_MODAL, currenPage} from "../../constants";
//import {router} from "../router";

export class WinningWindow extends Base {
  constructor() {
    super("div", ["winningContent"]);
  }

  async showWinModal(errors?: number) {
    this.element.innerHTML = ``;
    if (errors) {
      var err = new Base("span", [], `${errors} errors`);
      var img = new Base("img");
      img.element.setAttribute("src", path.failEnd);
    } else {
      var err = new Base("span", [], `Wins!`);
      var img = new Base("img");
      img.element.setAttribute("src", path.successEnd);
    }
    this.element.append(err.element, img.element);
    await delay(DELAY_OF_MODAL);
    modalWindow.close();
    //router.navigateTo("/");
    // main.insertPage(catPage.element);
    currenPage.page = "Main Page";
    aside.updateList();
    rootContainer.updateBtnStart();
  }
}
