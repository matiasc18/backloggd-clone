import React from 'react';

const LandingPage = () => {
  return (
    <div id="landing-page" className="container bg-primary vh-100">
      <form id="signup-form" className="bg-secondary">
        <div className="d-flex justify-content-evenly">
          <div>
            <label for="first-name" class="form-label">First Name</label>
            <input id="first-name" className="form-control" type="text" placeholder="First Name"/>
          </div>
          <div>
            <label for="last-name" class="form-label">Last Name</label>
            <input id="last-name" className="form-control" type="text" placeholder="Last Name"/>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-evenly">
            <div>
              <label for="username" class="form-label">Username</label>
              <input id="username" className="form-control" type="text" placeholder="Username"/>
            </div>
            <div>
              <label for="email" class="form-label">Email</label>
              <input id="email" className="form-control" type="email" placeholder="Email"/>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-evenly">
            <div>
              <label for="password" class="form-label">Password</label>
              <input id="password" className="form-control" type="password" placeholder="Password"/>
            </div>
            <div>
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input id="confirm-password" className="form-control" type="password" placeholder="Confirm Password"/>
            </div>
          </div>
        </div>
        <button type="button" className="btn btn-secondary btn-lg">Large button</button>
      </form>
    </div>
  )
}

export default LandingPage;

/*

FIRST

const LandingPage = () => {
  return (
    <div id="landing-page" className="container py-2" style={{"background-color": "gray"}}>
      <form id="signup-form">
        <div className="row justify-content-center">
          <div className="col-5">
            <label for="first-name" class="form-label">First Name</label>
            <input id="first-name" className="form-control" type="text" placeholder="First Name"/>
          </div>
          <div className="col-5">
            <label for="last-name" class="form-label">Last Name</label>
            <input id="last-name" className="form-control" type="text" placeholder="Last Name"/>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <label for="username" class="form-label">Username</label>
            <input id="username" className="form-control" type="text" placeholder="Username"/>
            </div>
          <div className="col-5">
            <label for="email" class="form-label">Email</label>
            <input id="email" className="form-control" type="email" placeholder="Email"/>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-5">
            <label for="password" class="form-label">Password</label>
            <input id="password" className="form-control" type="password" placeholder="Password"/>
          </div>
          <div className="col-5">
            <label for="confirm-password" class="form-label">Confirm Password</label>
            <input id="confirm-password" className="form-control" type="password" placeholder="Confirm Password"/>
          </div>
        </div>
      </form>
    </div>
  )
}

SECOND

const LandingPage = () => {
  return (
    <div id="landing-page" className="container">
      <form id="signup-form" className="d-flex align-items-center flex-column justify-content-center">
        <div className="d-flex">
          <label for="first-name" class="form-label">First Name</label>
          <input id="first-name" className="form-control" type="text" placeholder="First Name"/>
          <label for="last-name" class="form-label">Last Name</label>
          <input id="last-name" className="form-control" type="text" placeholder="Last Name"/>
        </div>
         <div className="d-flex">
          <label for="username" class="form-label">Username</label>
          <input id="username" className="form-control" type="text" placeholder="Username"/>
          <label for="email" class="form-label">Email</label>
          <input id="email" className="form-control" type="email" placeholder="Email"/>
        </div>
        <div className="d-flex">
          <label for="password" class="form-label">Password</label>
          <input id="password" className="form-control" type="password" placeholder="Password"/>
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input id="confirm-password" className="form-control" type="password" placeholder="Confirm Password"/>
        </div>
      </form>
     </div>
    )
  }

*/