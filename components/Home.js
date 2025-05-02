import styles from "../styles/Home.module.css";
import Image from "next/image";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.home}>
          <div className={styles.left}>
            <div className={styles.leftUp}>
              <Image
                className={styles.logo}
                src={"/logo-twitter.png"}
                alt={"logo-twitter.png"}
                width={60}
                height={60}
              />
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.tweet_content}>
              <div>
                <h1 className={styles.title}>Home</h1>
              </div>
              <div className={styles.input_content}>
                <input
                  placeholder="What's up?"
                  className={styles.tweet_input}
                ></input>
              </div>
              <div className={styles.tweet_down}>
                <button className={styles.btn_tweet}>Tweet</button>
              </div>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </main>
    </div>
  );
}

export default Home;
