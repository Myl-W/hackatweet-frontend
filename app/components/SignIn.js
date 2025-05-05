import styles from "../styles/ModalSignin.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUsername, userPassword } from "../../reducer/login";
import { userLogin } from "../../reducer/userAccess";
import Image from "next/image";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.valueUsername);
  const password = useSelector((state) => state.login.valuePassword);

  const handleConnection = (e) => {
    e.preventDefault();
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
        console.log('data', data);
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

  const handleRedirectLogin = () => {
    router.push("login/SignUp");
  };

  return (
    <div className={styles.loginContent}>
      <div className={styles.btn_modal_content}>
        <button
          className={styles.btn_modal}
          onClick={(e) => e.stopPropagation()}
        >
          X
        </button>
      </div>
      <div>
        <Image
          className={styles.logo}
          src={"/logo-twitter.png"}
          alt={"logo-twitter.png"}
          width={60}
          height={60}
        />
      </div>
      <div>
        <h2 className={styles.title}>Connectez-vous à hackatweet</h2>
      </div>

      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => {
            const value = e.target.value;

            dispatch(userUsername(value));
          }}
        />
      </div>
      <div>
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            const value = e.target.value;

            dispatch(userPassword(value));
          }}
        />
      </div>
      <div>
        <button
          type="submit"
          className={styles.login}
          onClick={handleConnection}
        >
          Se connecter
        </button>
      </div>
      <div>
        <p>
          Vous n'avez pas de compte ?{" "}
          <button
            onClick={handleRedirectLogin}
            className={styles.btn_inscription}
          >
            Inscrivez-vous
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
