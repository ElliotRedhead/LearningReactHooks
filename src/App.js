import React from "react";
import Home from "./Home";
import Speakers from "./Speakers";

const pageToShow = pageName => {
  if (pageName === "Home") return <Home />;
  if (pageName === "Speakers") return <Speakers />;
  return <div>Not Found</div>;
};

/**
 * Handles the page routing based on the page title string.
 * @param {string} pageName The title of the page to be displayed.
 * @returns {object} The page to be displayed.
 */
const App = ({pageName}) => (
  <div>{pageToShow(pageName)}</div>
);

export default App;