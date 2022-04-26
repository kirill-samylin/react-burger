import {API_URL} from "constants/api";
import {getJSON} from "../utils/getJSON";
import {IIngredient} from "types/burger-ingredient";

export interface GetIngredientsResponse {
  success: boolean;
  data: IIngredient[];
}

export const getIngredients = (): Promise<GetIngredientsResponse> => {
  return fetch(`${API_URL}/ingredients`)
    .then(getJSON);
}
