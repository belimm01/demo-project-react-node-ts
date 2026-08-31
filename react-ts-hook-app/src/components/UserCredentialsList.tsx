import { useQuery } from "@tanstack/react-query";
import { getAll } from "../api/user.api";

export default function UserCredentialsList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userCredentials"],
    queryFn: getAll,
  });

  return (
    <>
      <h3>User credentials list:</h3>
      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load user credentials.</p>}
      <ul>
        {data?.map((userCredential) => (
          <li key={userCredential.id}>{userCredential.email}</li>
        ))}
      </ul>
    </>
  );
}
