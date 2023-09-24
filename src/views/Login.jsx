import { createRef, useState } from "react";
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const emailRef = createRef()
  const passwordRef = createRef()
  const navigate = useNavigate();
  const { setUser, setToken } = useStateContext()
  const [message, setMessage] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    axiosClient.post('/login', payload).then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
        navigate('/profile');
      
    })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)

          // Clear the message after 5 seconds
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        }
      })
  }

  return (
    <div className="login-page">
      {message &&
        <div className="alert">
          <p>{message}</p>
        </div>
      }

      <div>
        <img src="/image/logo.png" alt="" />
      </div>
      <form onSubmit={onSubmit} >
        <h3>Login</h3>
        <input ref={emailRef} type="email" placeholder="Email" autoComplete="" />
        <input ref={passwordRef} type="password" placeholder="Password" autoComplete="" />
        <button>Login</button>
        <div className="to-register">To Create New Account Click <Link to={"/signup"}>SingUp</Link></div>
      </form>
    </div>
  )
}
