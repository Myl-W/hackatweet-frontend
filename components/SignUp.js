import React, { useState } from "react";
import styles from "../styles/ModalSignup.module.css";

function SignUp() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

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

  return (
    <div>
      <h2 className={styles.title}>Créer votre compte</h2>
      <form>
        <div>
          <div>
            <input type="text" placeholder="Username" />
          </div>
          <div>
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <div>
          <h5 className={styles.text}>Date de naissance</h5>
          <p className={styles.text_dateNaissance}>
            Cette information ne sera pas affichée publiquement. Confirmez votre
            âge, même si ce compte est pour une entreprise, un animal de
            compagnie ou autre chose.
          </p>
        </div>
        <div>
          <label>
            Month:
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              <option value="">--</option>
              {months.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label>
            Day:
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              <option value="">--</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <label>
            Year:
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="">--</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <p>
            Selected date:{" "}
            {day && month && year
              ? `${year}-${month.padStart?.(2, "0")}-${day.padStart?.(2, "0")}`
              : "Incomplete"}
          </p>
        </div>

        <button type="submit">S'enregistrer</button>
      </form>
    </div>
  );
}

export default SignUp;
