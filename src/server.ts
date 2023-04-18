import {routPath, baseUrl} from "./constants";
import {ICategory} from "./interface/category";
import {ICard} from "./interfaces";
export class Server {
  constructor() {}

  async getCardsByCategory(catIid: number) {
    let response = await fetch(`${baseUrl}${routPath.cardsByCategory}/${catIid}`);
    let data = await response.json();
    // let totalItems = data.length;
    // console.log({ data, totalItems });
    return data;
  }

  async getCategories(id?: number) {
    let response = id
      ? await fetch(`${baseUrl}${routPath.categories}/${id}`)
      : await fetch(`${baseUrl}${routPath.categories}`);
    let data = await response.json();
    //let totalItems = data.length;
    //console.log({ data, totalItems });
    return data;
  }

  async getCards() {
    let response = await fetch(`${baseUrl}${routPath.cards}`);
    let data: ICard[] = await response.json();
    return data;
  }

  async updateCategory(par: ICategory) {
    const response = await fetch(`${baseUrl}${routPath.categories}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(par),
    });
    let data = await response.json();
    console.log("updated: ", data);
  }
}
