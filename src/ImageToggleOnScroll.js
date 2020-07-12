import React, {useRef} from "react";

const ImageTogglerOnScroll = ({primaryImg, secondaryImg}) => {

  const imageRef = useRef(null);

  useEffect(() => {
    // Specify what is run when the component is mounted.
    window.addEventListener("scroll", scrollHandler);
    // Specify what is run when the function exits, if useEffect is ran multiple times before unmounting
    // then component dependencies are supplied in a list within second arg.
    return (() => {
      window.removeEventListener("scroll", scrollHandler);
    });
  });

  return (
    <img 
      onMouseOver={() => {imageRef.current.src = secondaryImg;}}
      onMouseOut={() => {imageRef.current.src = primaryImg;}}
      src={primaryImg}
      alt=""
      ref={imageRef}
    />
  );
};

export default ImageTogglerOnMouseOver;