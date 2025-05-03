"use client";

import styles from "../styles/Login.module.css";
import { useState } from "react";
import Image from "next/image";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import Modal from "../components/Modal";

export default function LoginPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  return (
    <>
      <div className={styles.home}>
        <div className={styles.home_left}>
          <div className={styles.logo_home_left}>
            <Image
              className={styles.logo_left}
              src="/logo-twitter.png"
              alt="logo-twitter"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className={styles.home_right}>
          <div className={styles.head_right}>
            <Image
              className={styles.logo_right}
              src="/logo-twitter.png"
              alt="logo-twitter"
              width={60}
              height={60}
            />
          </div>
          <div>
            <h1 className={styles.text}>See what's</h1>
            <h1 className={styles.text}>happenning</h1>
            <h4 className={styles.text} style={{ fontSize: "20px" }}>
              Join Hackatweet today.
            </h4>
          </div>
          <div>
            <button
              className={styles.btn_signup}
              onClick={() => setIsSignUpOpen(true)}
            >
              Sign up
            </button>

            <p className={styles.text_btn}>Already have an account?</p>

            <button
              className={styles.btn_signin}
              onClick={() => setIsSignInOpen(true)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
        <SignUp />
      </Modal>

      <Modal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
        <SignIn />
      </Modal>
    </>
  );
}
