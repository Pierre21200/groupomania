import Form from "./Form.jsx";

function App() {
  return (
    <div className="home">
      <Form signIn={false} />
      <Form />
    </div>
  );
}

export default App;
