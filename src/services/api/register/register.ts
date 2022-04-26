import {API_URL} from "constants/api";
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

export const register = (data: RegisterBody): Promise<RegisterResponse> => {
  return fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getJSON)
}
