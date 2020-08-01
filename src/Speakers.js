import React, { useState, useEffect, useContext, useReducer, useCallback, useMemo} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";
import { ConfigContext } from "./App";
import useAxiosFetch from "./useAxiosFetch";
import axios from "axios";

const Speakers = ({}) => {
  const {
    data,
    isLoading,
    hasErrored,
    errorMessage,
    updateDataRecord
  } = useAxiosFetch("http://localhost:4000/speakers", []);
  
  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  const context = useContext(ConfigContext);



  /* Cache the filtered and sorted speaker list for multiple use cases.
  * If any of the dependency array is altered, the memoised version is dumped and filter/sort re-ran.
  */
  const newSpeakerList = useMemo(() => data
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
    }),[speakingSaturday, speakingSunday, data]);

  const speakerListFiltered = isLoading
    ? []
    : newSpeakerList;

  if(hasErrored)
    return (
      <div>
        {errorMessage}"Make sure you have launched 'npm run json-server'"
      </div>
    );
  
  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  const heartfavouriteHandler = useCallback((e, speakerRec) => {
    e.preventDefault();
    const toggledRec = { ...speakerRec, favourite: !speakerRec.favourite};
    axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, toggledRec)
      .then(function(response) {
        updateDataRecord(toggledRec);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

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
              ({ id, firstName, lastName, sat, sun, bio, favourite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favourite={favourite}
                    onHeartfavouriteHandler={heartfavouriteHandler}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    sat={sat}
                    sun={sun}
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
