import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InvalidMessage from "../common/InvalidMessage";
import { save } from "../../api/user.api";
import type { CreateUserCredentials } from "../../model/userCredentialsModel";
import styles from "../../style/main.module.scss";

export default function CreateUserCredentialsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserCredentials>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: save,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["userCredentials"] });
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreateUserCredentials> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <h3>Add new user credentials</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ padding: "2rem" }}>
          <div className={errors.email ? styles.error : styles.success}>
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
              isError={Boolean(errors.email)}
              message={errors.email?.message ?? ""}
            />
          </div>
          <div
            className={errors.password ? styles.error : styles.success}
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
              isError={Boolean(errors.password)}
              message={errors.password?.message ?? ""}
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
