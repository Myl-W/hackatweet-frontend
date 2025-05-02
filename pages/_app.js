import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import register from "../reducer/register";
import userAccess from "../reducer/userAccess";

const store = configureStore({
  reducer: { register, userAccess },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Next.js App</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
