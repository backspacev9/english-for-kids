import {modalWindow, winWindow, rootContainer, audio} from "..";
import {statusGame, path} from "../constants";
import {delay} from "../functions/delay";
import {CardElement} from "./pages/cardsPage/cardElement";
//import {router} from "./router";

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
    //   statusGame.isGame = true;
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
    statusGame.isGame = false;

    if (isForceExit == false) {
      //main.insertPage(catPage.element);
      //router.navigateTo("/");
      modalWindow.insertContent(winWindow.element);
      if (this.totalWrong > 0) {
        winWindow.showWinModal(this.totalWrong);
        this.playAudio(path.failSound);
      } else {
        winWindow.showWinModal();
        this.playAudio(path.succesSound);
      }
      rootContainer.element.append(modalWindow.element);
    }

    rootContainer.clearRating();
    rootContainer.updateBtnStart();
    // this.arrCards.forEach((el) => {
    //   lsHadle.setPercent(el.word);
    // });
  }

  // private async checkCard(card: CardElement): Promise<void> {
  //   return new Promise<void>(async (resolve) => {
  //     this.currentWord = card.word;
  //     if (card.audio === this.currentAudio) {
  //       this.playAudio(path.rightAnswer);
  //       card.element.classList.add("disabled");
  //       rootContainer.addStar(true);
  //       lsHadle.updateLocal(card.word, 0, answerScore, 0);
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
  //       this.playAudio(path.wrongAnswer);
  //       rootContainer.addStar(false);
  //       lsHadle.updateLocal(card.word, 0, 0, answerScore);
  //     }
  //     resolve();
  //     this.isProgress = false;
  //   });
  // }

  async playAudio(src?: string) {
    audio.currentTime = 0;
    this.currentAudio = this.audios[this.counter];
    if (src) {
      audio.src = src;
    } else {
      audio.src = this.currentAudio;
    }
    audio.play();
  }
}
