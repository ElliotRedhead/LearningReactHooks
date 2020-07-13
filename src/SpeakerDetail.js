import ImageToggleOnScroll from "./ImageToggleOnScroll";
import React from "react";

const SpeakerDetail = ({
  id,
  firstName,
  lastName,
  favorite,
  bio,
  onHeartFavoriteHandler
}) => {
  //console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
  return (
    <div className="card col-4 cardmin">
      <ImageToggleOnScroll
        className="card-img-top"
        primaryImg={`/public/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/public/speakers/Speaker-${id}.jpg`}
        alt="{firstName} {lastName}"
      />
      <div className="card-body">
        <h4 className="card-title">
          <button
            data-sessionid={id}
            className={favorite ? "heartredbutton" : "heartdarkbutton"}
            onClick={e => {
              onHeartFavoriteHandler(e, !favorite);
            }}
          />
          <span>
            {firstName} {lastName}
          </span>
        </h4>

        <span>{bio}</span>
      </div>
    </div>
  );
};

export default SpeakerDetail;
