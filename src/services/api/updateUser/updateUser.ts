import {API_URL} from "constants/api";
import {getJSON} from "services/api/utils/getJSON";

export interface UpdateUserResponse {
  success: true;
  user: {
    email: string;
    name: string;
  }
}

export interface updateUserBody {
  user: string;
  email: string;
  password: string;
}

export const updateUser = (data: updateUserBody, accessToken: string): Promise<UpdateUserResponse> => {
  return fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
    body: JSON.stringify(data)
  })
    .then(getJSON);
}
