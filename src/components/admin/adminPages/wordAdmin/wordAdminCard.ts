import { Base } from "../../../base";

export class WordAdminCard extends Base {
  private word = new Base("span", [], "Word:");
  private translation = new Base("span", [], "Translation:");
  private sound = new Base("span", [], "Sound:");
  private img = new Base("span", [], "Image:");

  private inputWord = <HTMLInputElement>new Base("input").element;
  private inputTranslation = <HTMLInputElement>new Base("input").element;
  private inputSound = <HTMLInputElement>new Base("input").element;
  private inputImg = <HTMLInputElement>new Base("input").element;

  private btnChange = new Base("span", ["btnChange", "btnControl"], "Change");
  private btnDelete = new Base("div", ["btnDelete"]);
  private btnAddWord = new Base("div", ["btnAddWordElement"]);

  constructor(word: string, translation: string, sound: string, img: string) {
    super("div", ["wordAdminCard"]);

    this.inputWord.value = word;
    this.inputTranslation.value = translation;
    this.inputSound.value = sound;
    this.inputImg.value = img;

    this.word.element.append(this.inputWord);
    this.translation.element.append(this.inputTranslation);
    this.sound.element.append(this.inputSound);
    this.img.element.append(this.inputImg);

    this.btnDelete.element.insertAdjacentHTML(
      "afterbegin",
      `<span></span>
      <span></span>`
    );
    this.btnAddWord.element.insertAdjacentHTML(
      "afterbegin",
      `Add new Word
       <div>
       <span></span>
      <span></span>
      </div>`
    );
    this.element.append(
      this.word.element,
      this.translation.element,
      this.sound.element,
      this.img.element,
      this.btnChange.element,
      this.btnDelete.element
    );
  }
}
