import React, {useState} from "react";

/**
 * useState is destructured into the first two properties: inputText becomes read-only variable that
 * is set by the second property: setInputText function.
 * @returns {object} The "input" DOM component.
 */
const InputElement = () => {

  // setInputText function: updates state, with state updated in inputText.
  const [inputText, setInputText] = useState("");

  return (
    // Input field that can capture typed text as it changes.
    // On change the setInputText function is called.
    <div>
      <input
        onChange={(event) => { setInputText(event.target.value);}}
        placeholder="Enter some text"/>
      {inputText}
    </div>
  );
};

export default InputElement;