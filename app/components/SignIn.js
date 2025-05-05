import styles from "../styles/ModalSignin.module.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUsername, userPassword } from "../../reducer/login";
import { userLogin } from "../../reducer/userAccess";
import Image from "next/image";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.valueUsername);
  const password = useSelector((state) => state.login.valuePassword);
  const [signInUsername, setSignInUsername] = useState("");
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(true);

  const handleConnection = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.result) {
          console.log(data);
          dispatch(
            userLogin({
              userAccess: data.result,
              token: data.token,
              username: data.username,
            })
          );
          userUsername("");
          userPassword("");
          router.push("/home");
        } else {
          router.push("/login");
        }
      });
  };

  const handleRedirectLogin = () => {
    router.push("/login");
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  return (
    <>
      <div className={styles.loginContent}>
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
              setSignInUsername(value);
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
      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp />
      </Modal>
    </>
  );
}

export default SignIn;
