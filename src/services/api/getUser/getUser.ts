import {API_URL} from "constants/api";
import {getJSON} from "../utils/getJSON";

export interface GetUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  }
}

export const getUser = (accessToken: string): Promise<GetUserResponse> => {
  return fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then(getJSON);
}
