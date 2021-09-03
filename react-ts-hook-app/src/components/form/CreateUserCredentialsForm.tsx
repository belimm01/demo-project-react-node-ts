import React from "react";
import styles from "../../style/main.module.scss";

import { useForm } from "react-hook-form";
import InvalidMessage from "../common/InvalidMessage";
import { save } from "../../api/user.api";
import { UserCredentialsModel } from "../../model/userCredentialsModel";
import { useMutation, useQueryClient } from "react-query";

export default function CreateUserCredentialsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const mutation = useMutation(save, {
    onSuccess: () => {
      queryClient.invalidateQueries("userCredentials");
    },
  });
  const onSubmit = (data: UserCredentialsModel) => {
    mutation.mutate(data);
  };
  return (
    <>
      <h3>Add new user credentials</h3>
      <form className={`${styles.form}`} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: "2rem" }}>
          <div
            className={errors.email ? `${styles.error}` : `${styles.success}`}
          >
            <label style={{ paddingRight: "1rem" }} htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Type email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
            />
            <InvalidMessage
              isError={errors.email}
              message={errors.email?.message ? errors.email.message : ""}
            />
          </div>
          <div
            className={
              errors.password ? `${styles.error}` : `${styles.success}`
            }
            style={{ paddingTop: "1rem" }}
          >
            <label style={{ paddingRight: "1rem" }} htmlFor="password">
              Password:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Type password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
            />
            <InvalidMessage
              isError={errors.password}
              message={errors.password?.message ? errors.password.message : ""}
            />
          </div>
          <div style={{ paddingTop: "1rem" }}>
            <input type="submit" />
          </div>
        </div>
      </form>
    </>
  );
}
