import * as Constants from "../../../constants";
import { CardCategory } from "../../../interface/cardCategory";
import { Cards } from "../../../interface/cards";
import { Base } from "../../base";
import { CardElement } from "./cardElement";
import "./cardsPage.scss";

export class CardsPage extends Base {
  private cards: CardElement[] = [];
  constructor() {
    super("div", ["cardField"]);
    Constants.rootContainer.btnStartGame.element.addEventListener(
      "click",
      () => {
        if (!Constants.statusGame.isGame) {
          Constants.game.startGame(this.cards);
          Constants.rootContainer.updateBtnStart();
        } else {
          Constants.game.playAudio();
        }
      }
    );
  }

  async addCards(categoryName: string = "Emotions") {
    Constants.aside.updateList();
    this.clearField();
    this.cards = [];
    let categories: CardCategory[] = await Constants.server.getCategories();
    let id = categories.find((id) => id.name === categoryName).id;

    //let jsonCards = await getCards();
    let jsonCards: Cards[] = await Constants.server.getCardsByCategory(id);
    // let data =
    //   jsonCards[jsonCards.findIndex((i) => i.category.name === categoryName)]
    //     .fields;

    jsonCards.forEach((el) => {
      this.cards.push(
        new CardElement(
          Constants.path.cloudinaryImg.concat(el.image),
          el.word,
          categoryName,
          el.translation,
          Constants.path.cloudinaryAudio.concat(el.audioSrc)
        )
      );
    });

    this.cards.forEach((card) => {
      this.element.append(card.element);
    });

    this.gameModOn();
  }

  gameModOn() {
    this.cards.forEach((card) => {
      card.hideFooter();
    });
  }

  clearField() {
    this.element.innerHTML = ``;
  }
}
