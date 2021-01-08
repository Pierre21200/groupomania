// import Fil from "./components/Fil/Fil.js";
import logo from "./icons/icon-above-font.png";
import Form from "./components/Form/Form.js";
import Input from "./components/Form/Input.js";
import Button from "./components/Form/Button.js";

function App() {
  return (
    <div className="home">
      <header>
        <div className="title">
          <img src={logo} alt="Logo" className="logo-home" />
        </div>
      </header>

      <div className="form-container">
        <Form signIn={false} />
        <Form signIn={true} />
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className="home">
//       <Fil />
//     </div>
//   );
// }

export default App;
