import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";
import Login from "./Login";

export const ConfigContext = React.createContext();

const pageToShow = pageName => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  if (pageName === "Login") return <Login />;
  return <div>Not Found</div>;
};

/**
 * Example configuration value for use in context.
 */
const configValue = {
  showSignMeUp: true,
  showSpeakerSpeakingDays: true,
};

/**
 * Handles the page routing based on the page title string.
 * @param {string} pageName The title of the page to be displayed.
 * @param {object} userInfo Auth details of the logged in user
 * @returns {object} The page to be displayed.
 */
const App = ({pageName, userInfo}) => {
  configValue.loggedInUserEmail = userInfo ? userInfo.email : '';
  return (
  <ConfigContext.Provider value={configValue}>
    <div>{pageToShow(pageName)}</div>
  </ConfigContext.Provider>
  );
};

export default App;
