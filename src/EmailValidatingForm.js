import React, { useState, useReducer } from "react";
import useInterval from "./useInterval";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/site.css";
import useEmailValidation from "./useEmailValidation";

/**
 * Renders an input field with a countdown limit for entry.
 * Calls custom hook.
 * @returns {object} Email input form with timer.
 */
const EmailValidatingForm = () => {

  const {count, email, setEmail, emailValid} = useEmailValidation(10);

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