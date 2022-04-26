import {API_URL} from "constants/api";
import { getCookie } from "utils/cookie/cookie";
import {getJSON} from "../utils/getJSON";

export interface CreateOrderResponse {
  name: string;
  order: {number: number};
  success: boolean;
}
export const createOrder = (ids: string[]): Promise<CreateOrderResponse> => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken') || '',
    },
    body: JSON.stringify({
      ingredients: ids,
    })
  })
    .then(getJSON)
}
