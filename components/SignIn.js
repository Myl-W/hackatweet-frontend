import React from "react";
import styles from "../styles/ModalSignin.module.css";

function SignIn() {
  return (
    <div>
      <h2 className={styles.title}>Connexion</h2>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default SignIn;
