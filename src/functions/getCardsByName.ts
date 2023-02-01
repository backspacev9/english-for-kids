import {ICategory} from "../interface/category";
import * as Constants from "../constants";

export async function getCardsByCategoryName(name: string) {
  let categories: ICategory[] = await Constants.server.getCategories();
  console.log(name + "\n" + categories);
  let id = categories.find((id) => id.name === name).id;

  let cards = await Constants.server.getCardsByCategory(id);
  return cards;
}
