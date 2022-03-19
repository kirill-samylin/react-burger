import {API_URL} from "constants/api";
import {getJSON} from "../utils/getJSON";
import {IIngredient} from "types/burger-ingredient";

export interface GetIngredientsRequest {
  success: boolean;
  data: IIngredient[];
}

export const getIngredientsRequest = (): Promise<GetIngredientsRequest> => {
  return fetch(`${API_URL}/ingredients`)
    .then(getJSON);
}
