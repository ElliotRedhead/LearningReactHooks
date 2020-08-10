import React from "react";
import App from "../src/App";
import ls from "local-storage";


const Index = ({ user, isServer }) => {
  const isBrowser = typeof window !== "undefined";

  if (isServer && isBrowser) {
    ls.set("userInfo", user);
  }
  return (
    <div>
      <App pageName="Home" userInfo={user} />;
    </div>
  );
};

Index.getInitialProps = async ({ req }) => {
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

export default Index;
