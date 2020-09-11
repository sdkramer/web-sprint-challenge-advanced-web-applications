import React, { useState } from "react";

import axios from "axios";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const initialState = {
    credentials: {
      username: "",
      password: "",
    },
  };

  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log("submitted!");
    axios
      .post("http://localhost:5000/api/login", state.credentials)
      .then((res) => {
        console.log("post res: ", res.data.payload);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => console.log("Post error: ", err));
  };

  return (
    <>
      <div className="ui container">
        <div className="ui segment" style={{backgroundColor: "rgb(221, 112, 112)"}}>
          <h1 className="ui header">Welcome to the Bubble App!</h1>
        </div>

        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Log-in to your account</div>
            </h2>
            <form className="ui large form" onSubmit={login}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={state.credentials.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={state.credentials.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <button className="ui button">Login</button>
              </div>

              <div className="ui error message"></div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
