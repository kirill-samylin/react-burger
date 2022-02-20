import {url} from "constants/api";
import {getJSON} from "services/api/utils/getJSON";

export interface RegisterBody {
  email: string;
  password: string;
  name: string
}

export interface RegisterResponse {
  success: boolean,
  user: {
    email: string;
    name: string;
  },
  accessToken: string;
  refreshToken: string;
}

export const registerRequest = (data: RegisterBody): Promise<RegisterResponse> => {
  return fetch(`${url}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getJSON)
}
