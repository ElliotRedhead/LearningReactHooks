import useInterval from "./useInterval";
import React, {useState, useReducer} from "react";

/**
 * Custom hook.
 * @param {integer} secondsFormValidFor Duration in seconds the user has to submit email.
 * @returns {object} The results of the hook calls in useEmailValidation.
 */
const useEmailValidation = (secondsFormValidFor) => {
  const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  // Set initial validity state to false (as assumed empty without autofill).
  const [emailValid, setEmailValid] = useState(false);
  const reducer = (state, action) => {
    state = action;
    // Check email validity within the reducer, prevents having to inline the call with the form.
    setEmailValid(validateEmail(state));
    return action;
  };
  // useReducer has the advantage of dynamically updating the email.
  const [email, setEmail] = useReducer(reducer, "");
  const [count, setCount] = useState(secondsFormValidFor);
  useInterval(
    () => {
      setCount(count - 1);
    },
    count > 0 ? 1000 : null
  );

  return { count, email, setEmail, emailValid };
};

export default useEmailValidation;