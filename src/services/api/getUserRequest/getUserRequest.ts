import {url} from "../../../constants/api";
import {getJSON} from "../utils/getJSON";

export interface GetUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export const getUserRequest = (accessToken: string): Promise<GetUserResponse> => {
  return fetch(`${url}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then(getJSON);
}
