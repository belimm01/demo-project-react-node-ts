import React from "react";
import { getAll } from "../api/user.api";
import { useQuery } from "react-query";
import { UserCredentialsModel } from "../model/userCredentialsModel";

export default function UserCredentialsList() {
  const query = useQuery("userCredentials", () =>
    getAll().then((res) => res.data)
  );

  return (
    <>
      <h3>User credentials list:</h3>
      <ul>
        {query.data?.length &&
          query.data.map((userCredential: UserCredentialsModel) => (
            <li key={userCredential.id}>{userCredential.email}</li>
          ))}
      </ul>
    </>
  );
}
