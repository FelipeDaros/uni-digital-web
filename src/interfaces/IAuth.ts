import { IAssinatura } from "./IAssinatura";
import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IAuth {
  status: string;
  message: string;
  user: IUser;
  assinatura: IAssinatura;
  access_token: string;
  token_type: string;
  expires_in: number;
  produto: IProduct;
}