import React, {useState} from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'; 


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [user, setUser] = useState({
    credentials: {
      username: '', 
      password: '', 
    }
  })

  const handleChanges = event => {
    setUser({
      credentials: {
        ...user.credentials, 
        [event.target.name]: event.target.value
      }
    })
  }; 

  const loggingIn = event => {
    event.preventDefault(); 
    axiosWithAuth()
    .post('/api/login', user.credentials)
    .then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.payload)); 
      props.history.push('/protected')
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p><br/><br/>
      <div>
        <form onSubmit={loggingIn}>

          <label htmlFor="username">
            UserName: 
            <input 
            name="username"
            id="username"
            type="text"
            value={user.credentials.username}
            onChange={handleChanges}
            />
          </label>

          <label htmlFor="password">
            PassWord:
            <input 
            name="password"
            id="password"
            type="password"
            value={user.credentials.password}
            onChange={handleChanges}
            />
          </label>
          
          <button>Log In</button>

        </form>
      </div>
    </>
  );
};

export default Login;
