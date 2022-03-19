export interface IIngredient {
  _id: string;
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
}

export type TMove = {dragIndex: number, hoverIndex: number};

export enum EIngredientType {
  BUN = 'bun',
  SAUSE = 'sauce',
  MAIN = 'main',
};

export interface IBurgerIngredient extends IIngredient {
  id: number;
}

export type TIngredientsItems = {
  [key: string]: IIngredient;
}
