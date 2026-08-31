export interface UserCredentialsModel {
  id: number;
  email: string;
  password: string;
}

export type CreateUserCredentials = Pick<
  UserCredentialsModel,
  "email" | "password"
>;
