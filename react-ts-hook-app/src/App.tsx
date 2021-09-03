import React from "react";
import "./App.css";
import styles from "./style/main.module.scss";
import CreateUserCredentialsForm from "./components/form/CreateUserCredentialsForm";
import UserCredentialsList from "./components/UserCredentialsList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <div className={styles.center}>
      <QueryClientProvider client={queryClient}>
        <UserCredentialsList />
        <CreateUserCredentialsForm />
      </QueryClientProvider>
    </div>
  );
}
