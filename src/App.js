import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";

export const ConfigContext = React.createContext();

const pageToShow = pageName => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

/**
 * Example configuration value for use in context.
 */
const configValue = {
  showSpeakerSpeakingDay: true
};

/**
 * Handles the page routing based on the page title string.
 * @param {string} pageName The title of the page to be displayed.
 * @returns {object} The page to be displayed.
 */
const App = ({pageName}) => (
  <ConfigContext.Provider value={configValue}>
    <div>{pageToShow(pageName)}</div>
  </ConfigContext.Provider>
);

export default App;