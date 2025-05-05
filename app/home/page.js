"use client";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userUsername } from "../../reducer/login";
import { userLogin } from "../../reducer/userAccess";
import { userMessage, userCount } from "../../reducer/msg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const username = useSelector((state) => state.userAccess.valueLogin);
  const user = useSelector((state) => state.userAccess.valueLogin);
  const message = useSelector((state) => state.msg.valueMsg);
  const count = useSelector((state) => state.msg.valueCount);
  const [messages, setMessages] = useState([]);
  const newMsg = { username, message, liked: false, likeCount: 0 };
  const [hashTag, setHashTag] = useState([]);
  const [activeHashtag, setActiveHashtag] = useState(null);

  const disconnect = () => {
    router.push("/login");
    localStorage.clear();
  };

  // Affichage des hashtag
  useEffect(() => {
    const pattern =
      /\B#([a-z0-9]{2,})(?![~!@#$%^&*()=+_`\-\|\/'\[\]\{\}]|[?.,]*\w)/gi;

  const counts = {};

  messages.forEach((msg) => {
    if (!msg || typeof msg.message !== 'string') return;
    const found = msg.message.match(pattern);
    if (found) {
      found.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });

  // Transformer en tableau exploitable
  const formattedTags = Object.entries(counts).map(([tag, count]) => ({
    tag,
    count,
  }));

    setHashTag(formattedTags);
  }, [messages]);

  // Liker un tweet
  const handleLikeTweet = (indexToLike) => {
    const updatedMessages = messages.map((msg, index) => {
      if (index === indexToLike) {
        const newLikedState = !msg.liked;
        const newLikeCount = newLikedState ? 1 : 0;
        return { ...msg, liked: newLikedState, likeCount: newLikeCount };
      }
      return msg;
    });

    setMessages(updatedMessages);
  };

  // Ajouter un tweet
  const handleTweet = () => {
    if (message.trim()) {
      const newTweet = {
        username,
        message,
        liked: false,
        likeCount: 0,
      };
      setMessages([...messages, newTweet]);
      dispatch(userMessage(""));
      dispatch(userCount(""));
    }
  };

  //Delete un tweet
  const deleteMsg = (indexToDelete) => {
    const updatedMessages = messages.filter(
      (_, index) => index !== indexToDelete
    );
    setMessages(updatedMessages);
  };

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
            <div className={styles.tweet_card}>
              <Image
                className={styles.tweet}
                src={"/tweet.jpg"}
                alt={"tweet.jpg"}
                width={60}
                height={60}
              />
              <div className={styles.tweet_name}>
                <p>{user.username}</p>
                <p>@{user.username}</p>
              </div>
            </div>
          </div>

          <div className={styles.center}>
            <div className={styles.tweet_content}>
              <div>
                <h1 className={styles.title}>Home</h1>
              </div>
              <div className={styles.input_content}>
                <input
                  id="add-message"
                  placeholder="What's up?"
                  className={styles.tweet_input}
                  value={message}
                  onChange={(e) => {
                    const value = e.target.value;
                    dispatch(userMessage(value));
                    dispatch(userCount(value));
                  }}
                ></input>
              </div>
              <div className={styles.tweet_down}>
                <p>{count}/280</p>
                <button className={styles.btn_tweet} onClick={handleTweet}>
                  Tweet
                </button>
              </div>
            </div>

            {/* Message list */}
            <div id="msg-container" className={styles.msgContent}>
              {messages
                .filter((msg) => {
                  if (!activeHashtag) return true;
                  return msg.message.includes(activeHashtag);
                })
                .map((msg, index) => (
                  <div key={index} className={styles.msgCard}>
                    <div className={styles.headTweet}>
                      <img className={styles.tweet_msg} src="/tweet.jpg" />
                      <h6>
                        {user.username} @{user.username}
                      </h6>
                    </div>

                    <div className="text-container">
                      <span>{msg.message}</span>
                    </div>

                    <div className={styles.footTweet}>
                      <span
                        onClick={() => handleLikeTweet(index)}
                        style={{
                          color: msg.liked ? "#e74c3c" : "white",
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </span>
                      <span>{msg.likeCount}</span>
                      <span onClick={() => deleteMsg(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.right}>
            <div>
              <h1 className={styles.title}>Trends</h1>
            </div>
            <div className={styles.hashtag}>
              {hashTag.map((item, index) => (
                <div key={index} className={styles.tag} onClick={() => setActiveHashtag(item.tag)} style={{ cursor: 'pointer' }}>
                  <div>
                    <span>{item.tag}</span>
                  </div>
                  <div className={styles.numberOfTags}>
                    {item.count} tweet{item.count > 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.logout_btn} onClick={disconnect}>
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
