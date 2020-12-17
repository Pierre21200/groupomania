import React, { useState } from "react";

function Test(props) {
  const [name, setName] = useState("putaindecode");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  return (
    <div>
      <label htmlFor="inputName">Name</label>
      <input
        id="inputName"
        type="text"
        value={name}
        name="firstname"
        onChange={handleNameChange}
      />
    </div>
  );
}

export default Test;