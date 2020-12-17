import Form from "./Form.js";

function App() {
  return (
    <div className="home">
      <Form signIn={false} />
      <Form signIn={true} />
    </div>
  );
}

export default App;
