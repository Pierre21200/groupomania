import React, {useState, useEffect} from "react"
import "./Form.css";

const Form = ({signIn=true}) => {

  const hide = !signIn ? "hidden" : "";


 
  const INPUT = ({hidden="", htmlFor, type="text", placeholder, onChange, value}) => {
  return <div className="input">
    <label hidden={hidden} htmlFor={htmlFor} className="visually-hidden"></label>
    <input hidden={hidden} type={type} className="form-control" placeholder={placeholder} onChange={onChange} value={value} required></input>
  </div>
  };


  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [disable, setDisable] = useState(false);


 function handleChangeFirstname (event) {
   event.preventDefault();
   setNewFirstname(event.target.value);
 }

 useEffect(() => {
  if (newFirstname !== "") {
    setDisable(true);
  }
}, []);

 function handleChangeLastname (event) {
  event.preventDefault();
  setNewLastname(event.target.value);
}
function handleChangeEmail (event) {
  event.preventDefault();
  setNewEmail(event.target.value);
}
function handleChangePassword(event) {
  event.preventDefault();
  setNewPassword(event.target.value);
}




  return <form>
    <INPUT hidden={hide} htmlFor="inputFirstname" placeholder='Firstname' onChange={handleChangeFirstname} value={newFirstname}/>
    <INPUT hidden={hide} htmlFor="inputLastname" placeholder='Lastname' onChange={handleChangeLastname} value={newLastname}/>
    <INPUT htmlFor="inputEmail" placeholder='Email' onChange={handleChangeEmail} value={newEmail}/>
    <INPUT htmlFor="inputPassword" placeholder='Password' onChange={handleChangePassword} value={newPassword}/>
    <button className={disable ? "btn btn-outline-primary" : "btn btn-outline-primary disabled"} type="button">Envoyer</button>
  </form>
}

export default Form;
