import type {
  CreateUserCredentials,
  UserCredentialsModel,
} from "../model/userCredentialsModel";

const BASE_URL = `${import.meta.env.VITE_API_URL ?? "http://localhost:3030"}/api/user`;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}

export function save(
  credentials: CreateUserCredentials,
): Promise<UserCredentialsModel> {
  return request<UserCredentialsModel>("/credentials/save", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function getAll(): Promise<UserCredentialsModel[]> {
  return request<UserCredentialsModel[]>("/credentials/all");
}
