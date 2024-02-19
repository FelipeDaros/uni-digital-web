import axios from "axios"
import { URL_LOCALHOST } from "../../env"

export const api = axios.create({
  baseURL: URL_LOCALHOST,
})
