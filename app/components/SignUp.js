import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/ModalSignup.module.css";
import Image from "next/image";
import {
  userFirstname,
  userUsername,
  userPassword,
} from "../../reducer/register";
import { userLogin } from "../../reducer/userAccess";

function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const firstname = useSelector((state) => state.register.valueFirstname);
  const username = useSelector((state) => state.register.valueUsername);
  const password = useSelector((state) => state.register.valuePassword);

  const login = useSelector((state) => state.userAccess.valueLogin);
  const logout = useSelector((state) => state.userAccess.valueLogout);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
        birthDate,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("sign up data", data);
        if (data.result) {
          console.log(data);
          dispatch(
            userLogin({
              userAccess: data.result,
              token: data.token,
              username: data.username,
            })
          );
          setSignUpUsername("");
          setSignUpPassword("");
          setSignUpFirstname("");
          router.push("/home");
        } else {
          router.push("/login");
        }
      });
  };

  useEffect(() => {
    if (day && month && year) {
      setBirthDate(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    }
  }, [day, month, year]);

  return (
    <div className={styles.content}>
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
      <h2 className={styles.title}>créez votre compte hackatweet</h2>

      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Firstname"
            className={styles.input}
            onChange={(e) => {
              const value = e.target.value;
              setSignUpFirstname(value);
              dispatch(userFirstname(value));
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            onChange={(e) => {
              const value = e.target.value;
              setSignUpUsername(value);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => {
              const value = e.target.value;
              setSignUpPassword(value);
              dispatch(userPassword(value));
            }}
          />
        </div>
      </div>
      <div>
        <h5 className={styles.text}>Date de naissance</h5>
        <p className={styles.text_dateNaissance}>
          Cette information ne sera pas affichée publiquement. Confirmez votre
          âge, même si ce compte est pour une entreprise, un animal de compagnie
          ou autre chose.
        </p>
      </div>
      <div className={styles.contentDate}>
        <label className={styles.dateLabel}>
          Day:
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={styles.dateInput}
          >
            <option value="" disabled hidden>
              Jour
            </option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.dateLabel} placeholder="Password">
          Month:
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={styles.dateInput}
          >
            <option value="" disabled hidden>
              Mois
            </option>
            {months.map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.dateLabel}>
          Year:
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={styles.dateInput}
          >
            <option value="" disabled hidden>
              Année
            </option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <p>
          Votre anniversaire:{" "}
          {day && month && year
            ? `🎉${day.padStart?.(2, "0")}-${month.padStart?.(
                2,
                "0"
              )}-${year}🎂`
            : "Incomplete"}
        </p>
      </div>

      <button
        type="button"
        className={styles.register}
        onClick={() => handleRegister()}
      >
        S'enregistrer
      </button>
    </div>
  );
}

export default SignUp;
