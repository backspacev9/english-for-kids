import {server} from "..";
import {ICategory} from "../interface/category";

export async function getCardsByCategoryName(name: string) {
  let categories: ICategory[] = await server.getCategories();
  console.log(name + "\n" + categories);
  let id = categories.find((id) => id.name === name).id;

  let cards = await server.getCardsByCategory(id);
  return cards;
}
