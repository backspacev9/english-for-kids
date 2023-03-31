import {ICategory} from "../../../interface/category";
import {ICard} from "../../../interface/cards";
import {Base} from "../../base";
import {CardElement} from "./cardElement";
import "./cardsPage.scss";
import {aside, header, main, rootContainer, server} from "../../..";
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
    // rootContainer.btnStartGame.element.addEventListener("click", () => {
    //   if (!statusGame.isGame) {
    //     game.startGame(this.cardsEl);
    //     rootContainer.updateBtnStart();
    //   } else {
    //     game.playAudio();
    //   }
    // });
    this.addCards();
    // header.inputSwitcher.addEventListener("input", (e) => {
    //   header.statusSwitcher.element.innerHTML = "";
    //   if (header.inputSwitcher.checked) {
    //     header.statusSwitcher.element.classList.remove("statusActive");
    //     header.statusSwitcher.element.innerText = "train";
    //     statusGame.gameMode = "train";
    //   } else {
    //     header.statusSwitcher.element.classList.add("statusActive");
    //     header.statusSwitcher.element.innerText = "play";
    //     statusGame.gameMode = "play";
    //   }
    //   // catPage.changeState();
    //   //router.navigateTo("/");
    //   this.gameModOn();
    //   rootContainer.updateBtnStart();
    // });
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
    let cards: ICard[] = await server.getCardsByCategory(this.categoriId); //id
    if (cards.length <= 0) {
      main.insertPage(new NotFoundPage(`no such category with id: ${this.categoriId}`).element);
      return;
    }
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
    this.loadingEl.element.remove();
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
