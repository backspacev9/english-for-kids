import * as Constants from "../constants";
import {delay} from "../functions/delay";
import {CardElement} from "./pages/cardsPage/cardElement";

export class Game {
  private audios: string[] = [];
  private isProgress = false;
  private counter: number = 0;
  private currentAudio: string = "";
  private currentWord: string = "";
  private arrCardsEl: CardElement[] = [];
  totalRight: number = 0;
  totalWrong: number = 0;
  constructor() {}

  clearData() {
    this.counter = 0;
    this.currentAudio = "";
    this.audios = [];
    this.isProgress = false;
    this.totalRight = 0;
    this.totalWrong = 0;
  }

  async startGame(cards: CardElement[]) {
    //   Constants.statusGame.isGame = true;
    //   this.clearData();
    //   this.arrCardsEl = cards;
    //   cards.forEach((el) => {
    //     this.audios.push(el.audio);
    //   });
    //   this.audios.sort(() => Math.random() - 0.5);
    //   this.playAudio();
    //   cards.forEach((el) => {
    //     el.element.addEventListener("click", async () => {
    //       if (!this.isProgress) {
    //         this.isProgress = true;
    //         await this.checkCard(el);
    //       }
    //     });
    //   });
  }

  endGame(isForceExit: boolean = false) {
    Constants.statusGame.isGame = false;

    if (isForceExit == false) {
      Constants.main.insertPage(Constants.catPage.element);
      Constants.modalWindow.insertContent(Constants.winWindow.element);
      if (this.totalWrong > 0) {
        Constants.winWindow.showWinModal(this.totalWrong);
        this.playAudio(Constants.path.failSound);
      } else {
        Constants.winWindow.showWinModal();
        this.playAudio(Constants.path.succesSound);
      }
      Constants.rootContainer.element.append(Constants.modalWindow.element);
    }

    Constants.rootContainer.clearRating();
    Constants.rootContainer.updateBtnStart();
    // this.arrCards.forEach((el) => {
    //   Constants.lsHadle.setPercent(el.word);
    // });
  }

  // private async checkCard(card: CardElement): Promise<void> {
  //   return new Promise<void>(async (resolve) => {
  //     this.currentWord = card.word;
  //     if (card.audio === this.currentAudio) {
  //       this.playAudio(Constants.path.rightAnswer);
  //       card.element.classList.add("disabled");
  //       Constants.rootContainer.addStar(true);
  //       Constants.lsHadle.updateLocal(card.word, 0, Constants.answerScore, 0);
  //       this.totalRight++;
  //       this.counter++;
  //       await delay(1000);
  //       if (this.counter <= this.audios.length - 1) {
  //         this.playAudio();
  //       } else {
  //         this.endGame();
  //       }
  //     } else {
  //       this.totalWrong++;
  //       this.playAudio(Constants.path.wrongAnswer);
  //       Constants.rootContainer.addStar(false);
  //       Constants.lsHadle.updateLocal(card.word, 0, 0, Constants.answerScore);
  //     }
  //     resolve();
  //     this.isProgress = false;
  //   });
  // }

  async playAudio(src?: string) {
    Constants.audio.currentTime = 0;
    this.currentAudio = this.audios[this.counter];
    if (src) {
      Constants.audio.src = src;
    } else {
      Constants.audio.src = this.currentAudio;
    }
    Constants.audio.play();
  }
}
