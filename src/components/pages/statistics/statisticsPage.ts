import {sortAsc} from "../../../functions/sortAsc";
import {sortDesc} from "../../../functions/sortDesc";
import {strorageItems} from "../../../interfaces";
import {Base} from "../../base";
import {StatisticItem} from "./statisticsItem";
import "./statisticsPage.scss";

export class StatisticsPage extends Base {
  private table = new Base("table");
  private tableBody = new Base("tbody", []);
  private headerTable = new Base("tr", ["headerTable"]);
  private thWord = new Base("th", ["thWord"], "Word");
  private thTranslation = new Base("th", ["thTranslation"], "Translation");
  private thCategory = new Base("th", ["thCategory"], "Category");
  private thClicks = new Base("th", ["thClicks"], "Clicks");
  private thCorrect = new Base("th", ["thCorrect"], "Correct");
  private thWrong = new Base("th", ["thWrong"], "Wrong");
  private thErrors = new Base("th", ["thErrors"], "Errors(%)");

  private btnReset = new Base("button", ["btnReset"], "Reset");
  private arrayOfTh: Base[] = [
    this.thWord,
    this.thTranslation,
    this.thCategory,
    this.thClicks,
    this.thCorrect,
    this.thWrong,
    this.thErrors,
  ];
  constructor() {
    super("div", ["statisticksPage"]);
    this.init();
  }
  private async init() {
    this.arrayOfTh.forEach((el) => {
      this.headerTable.element.append(el.element);
    });
    this.tableBody.element.append(this.headerTable.element);
    this.table.element.append(this.tableBody.element);
    this.element.append(this.btnReset.element, this.table.element);
    await this.addStatistic();

    this.btnReset.element.addEventListener("click", () => {
      // lsHadle.initLocalStorage();
      this.addStatistic();
    });

    this.arrayOfTh.forEach((el) => {
      el.element.addEventListener("click", (e: Event) => {
        this.sort(e);
      });
    });
  }

  sort(e: Event) {
    let target = <HTMLElement>e.target;
    console.log(target.innerText);
    if (!target.classList.contains("asc" || "desc")) {
      target.classList.add("desc");
    }
    target.classList.toggle("desc");
    target.classList.toggle("asc");
    if (target.classList.contains("asc")) {
      this.addStatistic("asc", target.innerText);
    } else {
      this.addStatistic("desc", target.innerText);
    }
  }

  async addStatistic(sort?: string, sortField?: string) {
    this.tableBody.element.innerHTML = "";
    this.tableBody.element.append(this.headerTable.element);
    let allObjects: strorageItems[] = [];
    //  let allWords = await lsHadle.getAllWords();
    // allWords.forEach((el) => {
    //   allObjects.push(lsHadle.getObject(el));
    // });

    if (sort) {
      if (sort === "asc") {
        allObjects = sortAsc(allObjects, sortField);
      }
      if (sort === "desc") {
        allObjects = sortDesc(allObjects, sortField);
      }
    }

    allObjects.forEach((obj: strorageItems) => {
      this.tableBody.element.appendChild(new StatisticItem().element);
    });
  }
}
