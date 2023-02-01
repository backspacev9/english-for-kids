import { strorageItems } from "../interface/strorageItems";
import * as Constants from "../constants";
import { getCards } from "../functions/getCards";
export class HandleLocalStorage {
  constructor() {
    this.checkFirstInit();
  }

  private checkFirstInit() {
    if (localStorage.getItem("isFirstTime") === null) {
      this.initLocalStorage();
      localStorage.setItem("isLoggedIn", "false");
      localStorage.setItem("isFirstTime", "false");
    }
  }

  async initLocalStorage() {
    let cardsJson = await getCards();
    cardsJson.forEach((el) => {
      el.fields.forEach((field) => {
        this.setObject(field.word, {
          word: field.word,
          translation: field.translation,
          category: el.category.name,
          clicks: 0,
          correct: 0,
          wrong: 0,
          percent: 0,
        });
      });
    });
  }

  private setObject(key: string, value: strorageItems) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getObject(key: string) {
    let value = localStorage.getItem(key);
    let data: strorageItems = JSON.parse(value);
    return data;
  }

  async getAllWords() {
    let words: string[] = [];
    let cardsJson = await getCards();
    cardsJson.forEach((el) => {
      el.fields.forEach((field) => {
        words.push(field.word);
      });
    });

    return words;
  }

  updateLocal(
    key: string,
    clicks: number = 0,
    correct: number = 0,
    wrong: number = 0
  ) {
    let data: strorageItems = this.getObject(key);
    let correct1 = data.correct + correct;
    let wrong1 = data.wrong + wrong;
    let clicks1 = data.clicks + clicks;
    this.setObject(key, {
      word: data.word,
      translation: data.translation,
      category: data.category,
      clicks: clicks1,
      correct: correct1,
      wrong: wrong1,
      percent: data.percent,
    });
  }

  setPercent(key: string) {
    let data: strorageItems = this.getObject(key);
    let correct = data.correct;
    let wrong = data.wrong;
    let percent = data.percent;
    if (correct != 0 || wrong != 0) {
      percent = Number(((correct / (correct + wrong)) * 100).toFixed(2));
    }

    this.setObject(key, {
      word: data.word,
      translation: data.translation,
      category: data.category,
      clicks: data.clicks,
      correct: data.correct,
      wrong: data.wrong,
      percent: percent,
    });
  }
}
