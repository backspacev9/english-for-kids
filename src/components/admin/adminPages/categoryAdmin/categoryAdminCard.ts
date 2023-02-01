import { Base } from "../../../base";
import * as Constants from "../../../../constants";
import { CardCategory } from "../../../../interface/cardCategory";
export class CategoryAdminCard extends Base {
  private category: CardCategory;
  private editMode = false;
  private elementName = <HTMLInputElement>(
    new Base("input", ["nameCategory"]).element
  );
  private inputImg = <HTMLInputElement>new Base("input").element;
  private lableImg = new Base("label", ["lableImg", "hideElement"]);
  private categoryImg = new Base("img", ["categoryImage"]);
  private words: Base;
  private btnContainerCategory = new Base("div", ["btnContainerCategory"]);
  private btnUpdate = new Base("span", ["btnUpdate", "btnControl"], "Update");
  private btnAddWord = new Base(
    "span",
    ["btnAddWord", "btnControl"],
    "Add word"
  );
  private btnDelete = new Base("div", ["btnDelete"]);

  constructor(category: CardCategory, totalWords: number) {
    super("div", ["categoryAdminCard"]);
    this.category = category;
    this.element.style.backgroundImage = `url('${Constants.path.cloudinaryImg.concat(
      this.category.image
    )}')`;
    this.words = new Base("span", ["wordsCategory"], `WORDS: ${totalWords}`);

    this.init();
  }

  init() {
    this.elementName.value = this.category.name;
    this.categoryImg.element.setAttribute(
      "src",
      `${Constants.path.cloudinaryImg.concat(this.category.image)}`
    );
    this.inputImg.type = "file";
    this.lableImg.element.append(
      "Picture of category",
      this.inputImg,
      this.categoryImg.element
    );
    this.btnDelete.element.insertAdjacentHTML(
      "afterbegin",
      `<span></span>
      <span></span>`
    );

    this.btnContainerCategory.element.append(
      this.btnUpdate.element,
      this.btnAddWord.element
    );
    this.element.append(
      this.btnDelete.element,
      this.elementName,
      this.words.element,
      this.lableImg.element,
      this.btnContainerCategory.element
    );
    this.btnAddWord.element.addEventListener("click", () => this.addWord());
    this.btnUpdate.element.addEventListener("click", () => this.editCategory());
  }

  private addWord() {
    Constants.containerCardsAdmin.insertPage(Constants.wordAdmin.element);
    Constants.wordAdmin.addWords(this.category.name);
  }
  private editCategory() {
    if (!this.editMode) {
      this.editMode = true;
      this.btnUpdate.element.innerHTML = `Accept`;
      this.elementName.classList.add("activeInput");
      this.words.element.classList.add("hideElement");
      this.lableImg.element.classList.remove("hideElement");
    } else {
      this.updateCategory();
      this.editMode = false;
      this.btnUpdate.element.innerHTML = `Update`;
      this.elementName.classList.remove("activeInput");
      this.words.element.classList.remove("hideElement");
      this.lableImg.element.classList.add("hideElement");
    }
  }
  private async updateCategory() {
    let updateCategory: CardCategory = {
      id: this.category.id,
      name: this.elementName.value,
      image: "category/fileName.jpg",
    };

    await Constants.server.updateCategory(updateCategory);
  }
}
