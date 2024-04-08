import axios from "axios"
import { URL_LOCALHOST, URL_PRODUCTION } from "../../env"

export const api = axios.create({
  baseURL: URL_PRODUCTION,
})
