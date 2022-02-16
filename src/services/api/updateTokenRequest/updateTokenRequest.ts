import {url} from "constants/api";
import {getJSON} from "services/api/utils/getJSON";

export interface UpdateTokenResponse {
  success: true;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateTokenBody {
  token: string;
}

export const updateTokenRequest = (data: UpdateTokenBody): Promise<UpdateTokenResponse> => {
  return fetch(`${url}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(getJSON);
}
