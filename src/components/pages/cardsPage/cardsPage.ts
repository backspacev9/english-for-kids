import {ICategory} from "../../../interface/category";
import {ICard} from "../../../interface/cards";
import {Base} from "../../base";
import {CardElement} from "./cardElement";
import "./cardsPage.scss";
import {aside, header, rootContainer, server} from "../../..";
import {statusGame} from "../../../constants";

export class CardsPage extends Base {
  private categoriId: number;
  private cardsEl: CardElement[] = [];
  constructor(catId?: number) {
    super("div", ["cardField"]);
    this.categoriId = catId;
    // rootContainer.btnStartGame.element.addEventListener("click", () => {
    //   if (!statusGame.isGame) {
    //     game.startGame(this.cardsEl);
    //     rootContainer.updateBtnStart();
    //   } else {
    //     game.playAudio();
    //   }
    // });
    this.addCards();
    header.inputSwitcher.addEventListener("input", (e) => {
      header.statusSwitcher.element.innerHTML = "";
      if (header.inputSwitcher.checked) {
        header.statusSwitcher.element.classList.remove("statusActive");
        header.statusSwitcher.element.innerText = "train";
        statusGame.gameMode = "train";
      } else {
        header.statusSwitcher.element.classList.add("statusActive");
        header.statusSwitcher.element.innerText = "play";
        statusGame.gameMode = "play";
      }
      // catPage.changeState();
      //router.navigateTo("/");
      this.gameModOn();
      rootContainer.updateBtnStart();
    });
  }

  async addCards(categoryName: string = "Emotions") {
    aside.updateList();
    this.clearField();
    this.cardsEl = [];
    let categories: ICategory[] = await server.getCategories();
    let id = categories.find((id) => id.name === categoryName).id;

    //let jsonCards = await getCards();
    let cards: ICard[] = await server.getCardsByCategory(this.categoriId); //id
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
