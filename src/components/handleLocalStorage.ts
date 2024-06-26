import {header, server} from "..";
import {IStateGame, storageItems} from "../interfaces";
const lsNames = {
  state: "state",
  statistics: "statistics",
};
export class StateLocalStorage {
  private storageCards: storageItems[] = [];
  constructor() {
    this.setState({isGameMode: false, isGameNow: false, currentCards: []});
    if (!localStorage.getItem(lsNames.statistics)) {
      this.initStatistics();
    }
  }

  setState(state: IStateGame) {
    localStorage.setItem(lsNames.state, JSON.stringify(state));
    // header.updateGameMode();
    window.dispatchEvent(new Event("storage"));
  }

  getState() {
    const value = localStorage.getItem(lsNames.state);
    const data: IStateGame = JSON.parse(value);
    return data;
  }

  async initStatistics() {
    const cards = await server.getCards();

    cards.forEach((el) => {
      this.storageCards.push({
        id: el.id,
        word: el.word,
        translation: el.translation,
        category: el.category,
        clicks: 0,
        correct: 0,
        wrong: 0,
        percent: 0,
      });
    });
    this.setStatistics(this.storageCards);
  }

  getStatisticCard(idCard: number) {
    const cards = this.getStatistics();
    return cards.filter((c) => c.id === idCard)[0];
  }
  getStatisticCardsByCategory(categoryName: string) {
    const cards = this.getStatistics();
    return cards.filter((c) => c.category === categoryName);
  }

  updateStatisticCard(card: storageItems) {
    const cards = this.getStatistics();
    const newCards: storageItems[] = cards.map((c) => {
      if (c.id === card.id) {
        c = card;
      }
      return c;
    });
    this.setStatistics(newCards);
  }
  updateStatCards(cardsArr: storageItems[]) {
    for (let i = 0; i < cardsArr.length; i++) {
      this.updateStatisticCard(cardsArr[i]);
    }
  }
  setStatistics(data: storageItems[]) {
    localStorage.setItem(lsNames.statistics, JSON.stringify(data));
  }
  getStatistics() {
    const value = localStorage.getItem(lsNames.statistics);
    const data: storageItems[] = JSON.parse(value);
    return data;
  }
}

// setPercent(key: string) {
//   const data: strorageItems = this.getObject(key);
//   const correct = data.correct;
//   const wrong = data.wrong;
//   const percent = data.percent;
//   if (correct != 0 || wrong != 0) {
//     percent = Number(((correct / (correct + wrong)) * 100).toFixed(2));
//   }

//   this.setObject(key, {
//     word: data.word,
//     translation: data.translation,
//     category: data.category,
//     clicks: data.clicks,
//     correct: data.correct,
//     wrong: data.wrong,
//     percent: percent,
//   });
// }
