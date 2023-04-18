import {modalWindow, winWindow, rootContainer, audio, stateLS} from "..";
import {statusGame, FilePath} from "../constants";
import {delay} from "../functions/delay";
import {ICard, storageItems} from "../interfaces";
import {CardElement} from "./pages/cardsPage/cardElement";
import router from "./router";
//import {router} from "./router";
interface ICardStatistic {
  id: number;
  word: string;
  translation: string;
  category: number;
  clicks: number;
  totalRight: number;
  totalWrong: number;
}

export class Game {
  private audios: string[] = [];
  private isProgress = false;
  private audioCounter: number = 0;
  private currentAudio: string = "";
  private statisticCards: storageItems[];
  private totalRight: number = 0;
  private totalWrong: number = 0;

  constructor() {}

  clearData() {
    this.audioCounter = 0;
    this.currentAudio = "";
    this.audios = [];
    this.isProgress = false;
    this.totalWrong = 0;
    this.totalRight = 0;
  }

  async startGame(cards: CardElement[]) {
    const categoryName = cards[0].getCard().category;
    this.statisticCards = stateLS.getStatisticCardsByCategory(categoryName);

    stateLS.setState({
      isGameMode: stateLS.getState().isGameMode,
      isGameNow: true,
    });
    //  statusGame.isGameNow = stateLS.getState().isGameNow;
    this.clearData();

    cards.forEach((el) => {
      const card = el.getCard();

      this.audios.push(card.audiosrc);
    });

    this.audios.sort(() => Math.random() - 0.5);

    this.playAudio();

    cards.forEach((el) => {
      el.element.addEventListener("click", async () => {
        if (!this.isProgress) {
          this.isProgress = true;

          await this.checkCard(el);
        }
      });
    });
  }

  endGame(isForceExit: boolean = false) {
    stateLS.setState({
      isGameMode: stateLS.getState().isGameMode,
      isGameNow: false,
    });

    // statusGame.isGameNow = stateLS.getState().isGameNow;
    if (!isForceExit) {
      modalWindow.insertContent(winWindow.element);
      if (this.totalWrong > 0) {
        winWindow.showWinModal(this.totalWrong);
        this.playAudio(FilePath.failSound);
      } else {
        winWindow.showWinModal();
        this.playAudio(FilePath.succesSound);
      }
      rootContainer.element.append(modalWindow.element);
    }

    rootContainer.clearRating();
    rootContainer.updateBtnStart();

    // this.arrCards.forEach((el) => { //##server side
    //   lsHadle.setPercent(el.word);
    // });
  }

  private async checkCard(cardEl: CardElement): Promise<void> {
    return new Promise<void>(async (resolve) => {
      const card = cardEl.getCard();

      //this.currentWord = card.word;
      if (card.audiosrc === this.currentAudio) {
        this.playAudio(FilePath.rightAnswer);
        cardEl.element.classList.add("disabled");
        rootContainer.addStar(true);
        this.audioCounter++;

        this.totalRight++;
        await delay(1000);
        if (this.audioCounter <= this.audios.length - 1) {
          this.playAudio();
        } else {
          this.endGame();
        }
      } else {
        this.totalWrong++;
        this.playAudio(FilePath.wrongAnswer);
        rootContainer.addStar(false);
        //  lsHadle.updateLocal(card.word, 0, 0, answerScore);
      }
      resolve();
      this.isProgress = false;
    });
  }

  playAudio(src?: string) {
    audio.currentTime = 0;
    this.currentAudio = this.audios[this.audioCounter];
    if (src) {
      audio.src = src;
    } else {
      audio.src = this.currentAudio;
    }
    audio.play();
  }
}
