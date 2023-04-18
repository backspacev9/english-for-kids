import {Base} from "../base";

import {delay} from "../../functions/delay";
import {modalWindow, aside, rootContainer} from "../..";
import {FilePath, DELAY_OF_MODAL, IconsPath} from "../../constants";
//import {router} from "../router";

export class WinningWindow extends Base {
  constructor() {
    super("div", ["winningContent"]);
  }

  async showWinModal(errors?: number) {
    this.element.innerHTML = ``;
    if (errors) {
      var err = new Base("span", [], `You have ${errors} errors`);
      var img = new Base("img");
      img.element.setAttribute("src", IconsPath.failEnd);
    } else {
      var err = new Base("span", [], `Congratulations! All worlds are correct!`);
      var img = new Base("img");
      img.element.setAttribute("src", IconsPath.successEnd);
    }
    this.element.append(err.element, img.element);
    await delay(DELAY_OF_MODAL);
    modalWindow.close();
    window.location.href = "/";

    aside.updateList();
    rootContainer.updateBtnStart();
  }
}
