import React, {useRef, useState, useEffect} from "react";

const ImageTogglerOnScroll = ({primaryImg, secondaryImg}) => {

  const imageRef = useRef(null);
  const [isLoading,setIsLoading] = useState(true);


  useEffect(() => {
    // Specify what is run when the component is mounted.
    window.addEventListener("scroll", scrollHandler);
    // Call function to check if component is in view on first mount.
    setInView(isInView());
    setIsLoading(false);
    // Specify what is run when the function exits, if useEffect is ran multiple times before unmounting
    // then component dependencies are supplied in a list within second arg.
    return (() => {
      window.removeEventListener("scroll", scrollHandler);
    });
  }, [isLoading]);

  // With a large quantity of images, assume that the image isn't in view initially.
  const [inView, setInView] = useState(false);

  /**
   * Determines if image is visible in the scrollable area.
   * @returns {boolean} true: image is in view, false: image is not in view.
   */
  const isInView = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }
    return false;
  };

  /**
   * Sets the inView state based on whether the image is in view.
   */
  const scrollHandler = () => {
    setInView(() => {
      return isInView();
    });
  };

  return isLoading ? null : (
    <img 
      src={inView ? secondaryImg : primaryImg}
      alt=""
      ref={imageRef}
      width="300"
      height="300"
    />
  );
};

export default ImageTogglerOnScroll;