import {delay} from "../../../functions/delay";
import {Base} from "../../base";
import * as Constants from "../../../constants";
import {strorageItems} from "../../../interface/strorageItems";
import {ICard} from "../../../interface/cards";

export class CardElement extends Base {
  private cardEl = new Base("div", ["card"]);
  private btnRotate = new Base("div", ["btnRotate"]);
  private isFlipped = false;
  private isPlay = false;
  private card: ICard = null;

  constructor(card: ICard) {
    super("div", ["cardContainer"]);
    const {id, word, translation, imagesrc, audiosrc, category_id} = card;
    this.card = {
      id: id,
      word: word,
      translation: translation,
      imagesrc: imagesrc,
      audiosrc: audiosrc,
      category_id: category_id,
    };
    this.cardEl.element.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="frontside" style ="background-image: url('${this.card.imagesrc}')">
      <div class="footerCard">${this.card.word}</div>
    </div>
    <div class="backside" style ="background-image: url('${this.card.imagesrc}')">
      <div class="footerCard">${this.card.translation}</div>
    </div>
    `
    );
    this.btnRotate.element.insertAdjacentHTML(
      "afterbegin",
      `
    <svg viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0417 3.33329L11.875 6.49996H14.25C14.25 9.12038 12.1204 11.25 9.5 11.25C8.70042 11.25 7.94042 11.052 7.28334 10.6958L6.1275 11.8516C7.10125 12.4691 8.25709 12.8333 9.5 12.8333C12.9992 12.8333 15.8333 9.99913 15.8333 6.49996H18.2083L15.0417 3.33329ZM4.75 6.49996C4.75 3.87954 6.87959 1.74996 9.5 1.74996C10.2996 1.74996 11.0596 1.94788 11.7167 2.30413L12.8725 1.14829C11.8988 0.530792 10.7429 0.166626 9.5 0.166626C6.00084 0.166626 3.16667 3.00079 3.16667 6.49996H0.791672L3.95834 9.66663L7.125 6.49996H4.75Z" fill="black"/>
    </svg>
  `
    );
    this.cardEl.element.append(this.btnRotate.element);
    this.element.append(this.cardEl.element);

    this.btnRotate.element.addEventListener("click", async () => {
      this.flipFront();
    });
    Constants.cardsPage.element.addEventListener("mouseover", (e: Event) => {
      let target = <HTMLElement>e.target;
      if (target.classList.contains("cardField")) {
        this.flipBack();
      }
    });
    this.cardEl.element.addEventListener("click", (e: Event) => {
      let target = <HTMLElement>e.target;
      if (Constants.statusGame.gameMode === "train" && target.classList.contains("frontside")) {
        this.playAudio(this.card.audiosrc);

        Constants.lsHadle.updateLocal(this.card.word, 1);
      }
    });
  }

  hideFooter() {
    let footers = this.cardEl.element.querySelectorAll(".footerCard");
    footers.forEach((el) => {
      if (Constants.statusGame.gameMode === "play") {
        el.classList.add("hideFooter");
        this.btnRotate.element.classList.add("hideFooter");
        this.cardEl.element.classList.add("playModCard");
      } else {
        el.classList.remove("hideFooter");
        this.btnRotate.element.classList.remove("hideFooter");
        this.cardEl.element.classList.remove("playModCard");
      }
    });
  }

  flipFront(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.isFlipped = true;
      this.cardEl.element.classList.add("rotated");
      this.cardEl.element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
    });
  }

  flipBack() {
    this.isFlipped = false;
    this.cardEl.element.classList.remove("rotated");
  }

  playAudio(path: string) {
    Constants.audio.currentTime = 0;
    Constants.audio.src = `${path}`;
    Constants.audio.play();
  }
}
