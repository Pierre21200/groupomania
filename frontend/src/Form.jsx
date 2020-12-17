import React, {useState} from "react"
import "./Form.css";

const Form = ({signIn=true}) => {

  const hide = !signIn ? "hidden" : "";
 
  const INPUT = ({hidden="", htmlFor, type="text", placeholder, onChange, value}) => {
  return <div>
    <label hidden={hidden} htmlFor={htmlFor} className="visually-hidden"></label>
    <input hidden={hidden} type={type} className="form-control" placeholder={placeholder} onChange={onChange} value={value} required></input>
  </div>
  };

  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

 function handleChangeFirstname (event) {
   setNewFirstname = event.target.value;
 }
 function handleChangeLastname (event) {
  setNewLastname = event.target.value;

}
function handleChangeEmail (event) {
  setNewEmail = event.target.value;

}
function handleChangePassword(event) {
  setNewPassword = event.target.value;

}

  return <form>
    <INPUT hidden={hide} htmlFor="inputFirstname" placeholder='Firstname' onChange={handleChangeFirstname} value={newFirstname}/>
    <INPUT hidden={hide} htmlFor="inputLastname" placeholder='Lastname' onChange={handleChangeLastname} value={newLastname}/>
    <INPUT htmlFor="inputEmail" placeholder='Email' onChange={handleChangeEmail} value={newEmail}/>
    <INPUT htmlFor="inputPassword" placeholder='Password' onChange={handleChangePassword} value={newPassword}/>
    <button className="oui" type="submit"></button>
  </form>

}

export default Form;



// export default class PersonList extends React.Component {
//   state = {
//     email: '',
//     password: ''
//   }

//   handleChangeEmail = event => {
//     this.setState({ email: event.target.value });
//   }

//   handleChangePassword= event => {
//     this.setState({ password: event.target.value });
//   }

//   handleSubmit = event => {
//     event.preventDefault();

//     const email = this.state.email;
//     const password = this.state.password;
    

//     axios.post(`http://localhost:4200/users/login`, { email, password })
//       .then(res => {
//         console.log(res);
//         console.log(res.data);
//       })
    
      
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Person email:
//             <input type="text" email="email" onChange={this.handleChangeEmail} />
//           </label>
//           <label>
//             Person password:
//             <input type="text" email="password" onChange={this.handleChangePassword} />
//           </label>
//           <button type="submit">Add</button>
//         </form>
//       </div>
//     )
//   }
// }