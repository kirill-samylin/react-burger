import {API_URL} from "constants/api";
import {getJSON} from "services/api/utils/getJSON";

export const forgotPasswordRequest  = (data: object) => {
  return fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getJSON);
}
