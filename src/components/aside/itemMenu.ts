import {Base} from "../base";
import * as Constants from "../../constants";

export class ItemMenu extends Base {
  tittle: string;
  private categoriesName: string[] = [];
  constructor(tittle: string) {
    super("li", ["ItemMenu"], tittle);
    this.tittle = tittle;

    this.element.addEventListener("click", () => {
      Constants.currenPage.page = this.tittle;

      if (this.tittle === "Main Page") {
        Constants.main.insertPage(Constants.catPage.element);
      } else {
        if (this.tittle === "Statistics") {
          Constants.main.insertPage(Constants.statPage.element);
          Constants.statPage.addStatistic();
        } else {
          Constants.cardsPage.addCards(this.tittle);
          Constants.main.insertPage(Constants.cardsPage.element);
        }
      }

      if (Constants.statusGame.isGame == true) {
        Constants.game.endGame(true);
      }
      Constants.rootContainer.updateBtnStart();
      Constants.aside.updateList();
    });
  }
}
