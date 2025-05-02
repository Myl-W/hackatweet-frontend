import styles from "../styles/ModalSignin.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUsername, userPassword } from "../../reducer/login";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.valueUsername);
  const password = useSelector((state) => state.login.valuePassword);

  console.log(username);
  console.log(password);

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(userLogin({ userAccess: data.result, token: data.token }));
          userUsername("");
          userPassword("");
          router.push("/home");
        } else {
          router.push("/login");
        }
      });
  };

  return (
    <div>
      <h2 className={styles.title}>Connexion</h2>
      <form>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            const value = e.target.value;

            dispatch(userUsername(value));
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            const value = e.target.value;

            dispatch(userPassword(value));
          }}
        />
        <button type="submit" onClick={() => handleConnection()}>
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default SignIn;
