import { useState } from "react";

const usernameObj = {
  name: "unknown entity",
  changedName: "unknown entity"
};

export default function Player() {

  const [ userNameObj , setUserNameObj ] = useState(usernameObj);
  const handleChange = (e) => {
    setUserNameObj((prev) => ({ ...prev, changedName: e.target.value }));
  }
  const handleClick = () => {
    setUserNameObj((prev) => ({ ...prev, name: prev.changedName }));
  }

  return (
    <section id="player">
      <h2>Welcome {userNameObj.name}</h2>
      <p>
        <input type="text" onChange={(e) => handleChange(e)}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
