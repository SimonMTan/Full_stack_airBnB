import React, { useState ,useEffect} from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import "./LoginForm.css"


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  // const [berror,setBerror] = useState([])
  // const history = useHistory()
  useEffect(() =>{
    const err = []
    if(!credential)err.push("Please provide Username/Email")
    if(!password)err.push("Please provide Password")
    setErrors(err)
  },[credential,password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const result = dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message){
          let valerror = []
          valerror.push(data.message)
          setErrors(valerror)
        }
      },
      // history.push('/')
    );

  };

  return (
    <div className="logincontainer">
      <h1>Welcome to i_BnB </h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors?.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            className="display"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder="Your Username/Email..."
          />
        </label>
        <label>
          Password
          <input
            className="display"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your Password..."
          />
        </label>
        <button type="submit" disabled={!!errors.length} className='loginButton'>Log In</button>
        <button type="submit" className='loginButton' onClick={() => {setCredential('demo@user.io'); setPassword('password')}}>demoUser</button>
      </form>
    </div>
  );
}

export default LoginForm;
