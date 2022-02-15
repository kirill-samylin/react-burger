import {url} from "constants/api";
import {getJSON} from "../utils/getJSON";

export const createOrderRequest = (ids: string[]) => {
  return fetch(`${url}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ids,
    })
  })
    .then(getJSON)
    .then(({order}) => order);
}
