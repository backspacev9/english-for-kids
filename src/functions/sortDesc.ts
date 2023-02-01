import { strorageItems } from "../interface/strorageItems";

export function sortDesc(arrObj: strorageItems[], field: string) {
  switch (field) {
    case "Word":
      return arrObj.sort((a, b) =>
        a.word < b.word ? 1 : a.word > b.word ? -1 : 0
      );
    case "Translation":
      return arrObj.sort((a, b) =>
        a.translation < b.translation
          ? 1
          : a.translation > b.translation
          ? -1
          : 0
      );
    case "Category":
      return arrObj.sort((a, b) =>
        a.category < b.category ? 1 : a.category > b.category ? -1 : 0
      );
    case "Clicks":
      return arrObj.sort((a, b) =>
        a.clicks < b.clicks ? 1 : a.clicks > b.clicks ? -1 : 0
      );
    case "Correct":
      return arrObj.sort((a, b) =>
        a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0
      );
    case "Wrong":
      return arrObj.sort((a, b) =>
        a.wrong < b.wrong ? 1 : a.wrong > b.wrong ? -1 : 0
      );
    case "Errors(%)":
      return arrObj.sort((a, b) =>
        a.percent < b.percent ? 1 : a.percent > b.percent ? -1 : 0
      );
    default:
      break;
  }
}
