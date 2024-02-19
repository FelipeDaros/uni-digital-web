import { IUser } from "./IUser";

export interface IAuth {
  status: string;
  message: string;
  user: IUser;
  access_token: string;
  token_type: string;
  expires_in: number;
}