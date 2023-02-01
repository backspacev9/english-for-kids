import * as Constants from "../../../constants";
import {ICategory} from "../../../interface/category";
import {ICard} from "../../../interface/cards";
import {Base} from "../../base";
import {CardElement} from "./cardElement";
import "./cardsPage.scss";

export class CardsPage extends Base {
  private cardsEl: CardElement[] = [];
  constructor() {
    super("div", ["cardField"]);
    Constants.rootContainer.btnStartGame.element.addEventListener("click", () => {
      if (!Constants.statusGame.isGame) {
        Constants.game.startGame(this.cardsEl);
        Constants.rootContainer.updateBtnStart();
      } else {
        Constants.game.playAudio();
      }
    });
  }

  async addCards(categoryName: string = "Emotions") {
    Constants.aside.updateList();
    this.clearField();
    this.cardsEl = [];
    let categories: ICategory[] = await Constants.server.getCategories();
    let id = categories.find((id) => id.name === categoryName).id;

    //let jsonCards = await getCards();
    let cards: ICard[] = await Constants.server.getCardsByCategory(id);
    // let data =
    //   jsonCards[jsonCards.findIndex((i) => i.category.name === categoryName)]
    //     .fields;

    cards.forEach((el) => {
      this.cardsEl.push(
        new CardElement({
          id: el.id,
          word: el.word,
          translation: el.translation,
          imagesrc: el.imagesrc,
          audiosrc: el.audiosrc,
          category_id: el.category_id,
        })
      );
    });

    this.cardsEl.forEach((card) => {
      this.element.append(card.element);
    });

    this.gameModOn();
  }

  gameModOn() {
    this.cardsEl.forEach((card) => {
      card.hideFooter();
    });
  }

  clearField() {
    this.element.innerHTML = ``;
  }
}
