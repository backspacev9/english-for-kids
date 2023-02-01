import {getCardsByCategoryName} from "../../../../functions/getCardsByName";
import {ICard} from "../../../../interface/cards";
import {Base} from "../../../base";
import "./wordAdmin.scss";
import {WordAdminCard} from "./wordAdminCard";

export class WordAdmin extends Base {
  private cards: WordAdminCard[];
  //private statusHeader = new Base("span", ["statusHeader"]);
  constructor() {
    super("div", ["wordAdmin"]);
  }

  async addWords(nameCategory: string) {
    console.log(nameCategory);
    this.cards = [];
    let jsonCards: ICard[] = await getCardsByCategoryName(nameCategory);

    // jsonCards.forEach((el) => {
    //   this.element.append(
    //     new WordAdminCard(el.word, el.translation, el.audioSrc, el.image)
    //       .element
    //   );
    // });
  }
}
