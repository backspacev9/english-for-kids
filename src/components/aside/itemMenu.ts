import {Base} from "../base";
import {CategoryPage} from "../pages/categoryPage/categoryPage";
import {CardsPage} from "../pages/cardsPage/cardsPage";

export class ItemMenu extends Base {
  tittle: string;
  private link:Base;
  id:number;
  private categoriesName: string[] = [];
  constructor(tittle: string, link?:string, id?:number) {
    super("li", ["ItemMenu"]);
    this.tittle = tittle;
    this.id = id;
    this.link = new Base('a',['link'],tittle)
    this.link.element.setAttribute('href', link)
    this.element.append(this.link.element)
    // this.element.addEventListener("click", () => {
    //   Constants.currenPage.page = this.tittle;

    //   if (this.tittle === "Main Page") {
    //     Constants.main.insertPage(new CategoryPage().element);
    //   } else {
    //     if (this.tittle === "Statistics") {
    //       Constants.main.insertPage(Constants.statPage.element);
    //       Constants.statPage.addStatistic();
    //     } else {
    //       // Constants.cardsPage.addCards(this.tittle);
    //        //Constants.cardsPage.element
    //     }
    //   }

    //   if (Constants.statusGame.isGame == true) {
    //     Constants.game.endGame(true);
    //   }
    //   Constants.rootContainer.updateBtnStart();
    //   Constants.aside.updateList();
    // });
  }
}
