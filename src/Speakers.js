import React, { useState, useEffect, useContext, useReducer} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";

const Speakers = ({}) => {
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);
  const [speakerList, dispatch] = useReducer(speakersReducer, []);
  // useState is like useReducer but with only a default action type
  const [isLoading, setIsLoading] = useState(true);

  const context = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
      const speakerListServerFilter = SpeakerData.filter(({ sat, sun }) => {
        return (speakingSaturday && sat) || (speakingSunday && sun);
      });
      dispatch({
        type: "setSpeakerList",
        data: speakerListServerFilter
      });
    });
    return () => {
      console.log("cleanup");
    };
  }, []); // [speakingSunday, speakingSaturday]);

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const speakerListFiltered = isLoading
    ? []
    : speakerList
      .filter(
        ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
      )
      .sort(function(a, b) {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      });

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  const heartfavouriteHandler = (e, favouriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    dispatch({
      type: favouriteValue === true ? "favourite" : "unfavourite",
      sessionId
    });
    console.log("changing session favourite to " + favouriteValue);
  };

  if (isLoading) return <div>Loading...</div>;
  console.log(context);
  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favourite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favourite={favourite}
                    onHeartfavouriteHandler={heartfavouriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
