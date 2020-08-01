import ImageToggleOnScroll from "./ImageToggleOnScroll";
import React, {useContext} from "react";
import {ConfigContext} from "./App";


const SpeakerDetail = React.memo(
  ({
    id,
    firstName,
    lastName,
    sat,
    sun,
    favourite,
    bio,
    onHeartFavouriteHandler
  }) => {
    const context = useContext(ConfigContext);
    return (
      <div className="card col-4 cardmin">
        <ImageToggleOnScroll
          className="card-img-top"
          primaryImg={`speakers/bw/Speaker-${id}.jpg`}
          secondaryImg={`speakers/Speaker-${id}.jpg`}
          alt="{firstName} {lastName}"
        />
        <div className="card-body">
          <h4 className="card-title">
            {context.loggedInUserEmail ? (
              <button
                data-sessionid={id}
                className={favourite ? "heartredbutton" : "heartdarkbutton"}
                onClick={e => {
                  onHeartFavouriteHandler(e, {
                    id,
                    firstName,
                    lastName,
                    sat,
                    sun,
                    favourite,
                    bio
                  });
                }}
              />
            ) : null}
            <span>
              {firstName} {lastName}
            </span>
          </h4>

          <span>{bio}</span>
        </div>
      </div>
    );
  }
);

export default SpeakerDetail;