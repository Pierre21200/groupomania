import React from "react"
import "./Form.css";

function Form() {
  return <div className="home row">
  <h1>Groupomania</h1>
   <div className="form row align-self-center">
   <main className="form-signin  align-self-start">
  <form>
    <h2 className="h3 mb-3 fw-normal">Please Sign-up </h2>
    <label htmlFor="inputFirstname" className="visually-hidden">Firstname</label>
    <input type="text" id="inputLastname" className="form-control" placeholder="Firstname" required/>
    <label htmlFor="inputLastname" className="visually-hidden">Lastname</label>
    <input type="text" id="inputLastname" className="form-control" placeholder="Lastname" required/>
    <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
    <label htmlFor="inputPassword" className="visually-hidden">Password</label>
    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign-up</button>
  </form>
</main>
  <main className="form-signin align-self-start">
  <form>
    <h2 className="h3 mb-3 fw-normal">Please Log-in</h2>
    <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
    <label htmlFor="inputPassword" className="visually-hidden">Password</label>
    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
    <div className="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button className="w-100 btn btn-lg btn-primary" type="submit">Log-in</button>
  </form>
</main>
</div>

</div>

}


export default Form;