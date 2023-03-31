import {header} from "..";
import {IState} from "../interfaces";

export class StateLocalStorage {
  constructor() {
    this.setState({isGame: false});
  }

  setState(state: IState) {
    localStorage.setItem("state", JSON.stringify(state));
    // header.updateGameMode();
    window.dispatchEvent(new Event("storage"));
  }

  getState() {
    const value = localStorage.getItem("state");
    const data: IState = JSON.parse(value);
    return data;
  }
}
// updateLocal(key: string, clicks: number = 0, correct: number = 0, wrong: number = 0) {
//   let data: strorageItems = this.getObject(key);
//   let correct1 = data.correct + correct;
//   let wrong1 = data.wrong + wrong;
//   let clicks1 = data.clicks + clicks;
//   this.setObject(key, {
//     word: data.word,
//     translation: data.translation,
//     category: data.category,
//     clicks: clicks1,
//     correct: correct1,
//     wrong: wrong1,
//     percent: data.percent,
//   });
// }

// setPercent(key: string) {
//   let data: strorageItems = this.getObject(key);
//   let correct = data.correct;
//   let wrong = data.wrong;
//   let percent = data.percent;
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
