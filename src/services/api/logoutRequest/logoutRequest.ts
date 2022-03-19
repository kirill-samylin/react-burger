import {API_URL} from "constants/api";
import {getJSON} from "../utils/getJSON";

export interface LogoutBody {
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export const logoutRequest = (data: LogoutBody): Promise<LogoutResponse> => {
  return fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getJSON)
}
