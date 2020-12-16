import React, {useState} from "react"
import "./Form.css";

import axios from 'axios';

function PersonList () {


  const [newEmail, setNewEmail] = useState();
  const [newPassword, setNewPassword] = useState();


  function handleChangeEmail (event) {
    setNewEmail = event.target.value;
  }

  function handleChangePassword (event) {
    setNewPassword = event.target.value;
  }


    return (
      <div>
        <form>
          <label>
            Person email:
            <input type="text" email="email" onClick={handleChangeEmail} />
          </label>
          <label>
            Person password:
            <input type="text" email="password"  />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
}

export default PersonList;



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