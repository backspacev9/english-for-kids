import { CardsCategory } from "../interface/cardsCategory";

export async function getCards() {
  const res = await fetch("./cards.json");
  const categories: CardsCategory[] = await res.json();

  return categories;
}
