import {EIngredientType, IIngredient, TIngredientsItems } from "types/burger-ingredient";

type TSortItem = IIngredient & {count: number};

type TSortList = {
  [key: string]: TSortItem;
}

export const getIngredientSortList = (dataIngredient: TIngredientsItems, list: string[]): TSortItem[] => {
  const sortList = list.reduce<TSortList>((obj, id) => {
    if (!obj[id]) {
      obj[id] = {
        ...dataIngredient[id],
        count: dataIngredient[id].type === EIngredientType.BUN ? 2 : 1,
      };
    } else {
      obj[id].count+=1;
    }
    return obj;
  }, {} as TSortList);

  return Object.values(sortList);
};

export const sumAllIngredients = (ingredients: TSortItem[]): number => ingredients
  .reduce((sum, {price, count}) => sum+=price*count, 0)
