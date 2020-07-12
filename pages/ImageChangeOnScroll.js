import React from "react";
import ImageToggleOnScroll from "../src/ImageToggleOnScroll";

const ImageChangeOnScroll = () => (
  <div>
    {[1124, 187, 823, 1269, 1530].map(speakerId => {
      return (
        <div key={speakerId}>
          <ImageToggleOnScroll
            primaryImg={`/speakers/bw/Speaker-${speakerId}.jpg`}
            secondaryImg={`/speakers/Speaker-${speakerId}.jpg`}
          />
        </div>
      );
    })}
  </div>
);

export default ImageChangeOnScroll;