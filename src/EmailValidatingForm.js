import React, { useState, useReducer } from "react";
import useInterval from "./useInterval";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";

/**
 * Renders an input field with a countdown limit for entry.
 */
const EmailValidatingForm = () => {
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
  const secondsFormValidFor = 60;
  const [count, setCount] = useState(secondsFormValidFor);
  useInterval(
    () => {
      setCount(count - 1);
    },
    count > 0 ? 1000 : null
  );

  return (
    <div className="container">
      <br />
      <div>
        <div className="content">
          <input
            disabled={count <= 0}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email"
            type="email"
            name="email"
            required
          />
          <button
            disabled={!emailValid || count <= 0}
            onClick={() => alert(`button clicked with email ${email}`)}
            className="btn-lg"
            type="submit"
          >
            Submit
          </button>
          <div>
            {count > 0
              ? `You Have ${count} Seconds To Enter Your Email`
              : "Timer Elapsed."}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailValidatingForm;