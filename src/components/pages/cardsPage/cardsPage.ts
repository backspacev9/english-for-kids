import {ICategory} from "../../../interface/category";
import {ICard} from "../../../interfaces";
import {Base} from "../../base";
import {CardElement} from "./cardElement";
import "./cardsPage.scss";
import {aside, game, header, main, rootContainer, server} from "../../..";
import {statusGame} from "../../../constants";
import NotFoundPage from "../notFound";
import Loading from "../../loading";

export class CardsPage extends Base {
  private categoriId: number;
  private cardsEl: CardElement[] = [];
  private loadingEl = new Loading("loading cards..");
  constructor(catId?: number) {
    super("div", ["cardField"]);
    this.categoriId = catId;

    this.addCards();

    this.element.addEventListener("mouseover", (e: Event) => {
      let target = <HTMLElement>e.target;
      if (target.classList.contains("cardField")) {
        this.cardsEl.forEach((el) => {
          el.flipBack();
        });
      }
    });
  }

  async addCards() {
    aside.updateList();
    this.clearField();
    this.cardsEl = [];
    this.element.append(this.loadingEl.element);
    let cards: ICard[] = await server.getCardsByCategory(this.categoriId);
    // game.init(cards);
    if (cards.length <= 0) {
      main.insertPage(new NotFoundPage(`no such category with id: ${this.categoriId}`).element);
      return;
    }
    cards.forEach((el) => {
      this.cardsEl.push(new CardElement(el));
    });
    statusGame.currentCards = this.cardsEl;
    this.loadingEl.element.remove();

    this.cardsEl.forEach((card) => {
      this.element.append(card.element);
    });
  }

  clearField() {
    this.element.innerHTML = ``;
  }
}
