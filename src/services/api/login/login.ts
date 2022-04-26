import {API_URL} from "constants/api";
import {getJSON} from "services/api/utils/getJSON";

export interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  }
}

export interface LoginBody {
  email: string;
  password: string;
}

export const login = (data: LoginBody): Promise<LoginResponse> => {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getJSON);
}
