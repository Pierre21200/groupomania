import Form from "./components/Form.js";
import Posts from "./components/Posts.js";
import Sidebar from "./components/Sidebar/Sidebar.js";
import Profile from "./components/Profile.js";
import Input from "./components/Input.js";
import Button from "./components/Button.js";
import logo from "./icons/icon-c.png";

// Page d'acceuil
// import "./log.css";
// function App() {
//   return (
//     <div className="home">
//       <header>
//         <h1>Groupomania</h1>
//       </header>
//       <div className="form-container">
//         <Form signIn={false} />
//         {/* <img className="logo-home" src={logo} alt="logo groupomania" /> */}
//         <Form signIn={true} />
//       </div>
//     </div>
//   );
// }

// Page principale, fil des posts
// import "./home.css";
// function App() {
//   return (
//     <div className="home">
//       <header className="row">
//         <div className="logo-home col-2">
//           <h1>Groupomania</h1>
//         </div>
//         <div className="input-container col-10">
//           <Input />
//         </div>
//       </header>
//       <section className="row">
//         <div className="sidebar-container col-2">
//           <Sidebar />
//         </div>
//         <div className="posts-container col-10">
//           <Posts />
//         </div>
//       </section>
//     </div>
//   );
// }

// Page Profil
import "./profile.css";
function App() {
  return (
    <div className="home">
      <Profile />
    </div>
  );
}

export default App;
