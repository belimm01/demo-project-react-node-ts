import axios from "axios";
import { UserCredentialsModel } from "../model/userCredentialsModel";

const BASE_URL = "http://localhost:3030/api/user";

export async function save(registerModel: UserCredentialsModel) {
  return axios.post(`${BASE_URL}/credentials/save`, registerModel);
}

export async function getAll() {
  return axios.get(`${BASE_URL}/credentials/all`);
}
