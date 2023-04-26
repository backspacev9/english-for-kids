import {storageItems} from "../../../interfaces";
import {Base} from "../../base";

export class StatisticItem extends Base {
  private fieldWord: Base;
  private fieldTraslation: Base;
  private fieldCategory: Base;
  private fieldClicks: Base;
  private fieldCorrect: Base;
  private fieldWrong: Base;
  private fieldErrors: Base;
  constructor(items: storageItems) {
    super("tr", ["statisticItem"]);

    this.fieldWord = new Base("td", [], items.word);
    this.fieldTraslation = new Base("td", [], items.translation);
    this.fieldCategory = new Base("td", [], items.category);
    this.fieldClicks = new Base("td", [], items.clicks.toString());
    this.fieldCorrect = new Base("td", [], items.correct.toString());
    this.fieldWrong = new Base("td", [], items.wrong.toString());
    this.fieldErrors = new Base("td", [], this.calcPercent(items.correct, items.wrong).toString());
    this.element.append(
      this.fieldWord.element,
      this.fieldTraslation.element,
      this.fieldCategory.element,
      this.fieldClicks.element,
      this.fieldCorrect.element,
      this.fieldWrong.element,
      this.fieldErrors.element
    );
  }
  private calcPercent(correct: number, wrong: number) {
    return correct != 0 || wrong != 0
      ? Number(((correct / (correct + wrong)) * 100).toFixed(2))
      : 0;
  }
}
