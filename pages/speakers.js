import React from "react";
import App from "../src/App";
import ls from "local-storage";

const Speakers = ({ user, isServer }) => {
  const isBrowser = typeof window !== "undefined";

  // Run on first page load and inside browser so store in local storage
  if (isServer && isBrowser) {
    ls.set("userInfo", user);
  }
  return (
    <div>
      <App pageName="Speakers" userInfo={user} />
    </div>
  );
};

Speakers.getInitialProps = async ({ req }) => {
  const isServer = !!req;

  if (isServer) {
    return { user: req.user, isServer };
  } else {
    try {
      const user = ls.get("userInfo");
      return { user, isServer };
    } catch (error) {
      return { isServer };
    }
  }
};

export default Speakers;