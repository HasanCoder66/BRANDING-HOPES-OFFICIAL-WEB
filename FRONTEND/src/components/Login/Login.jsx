import "./login.css";
import { Link } from "react-router-dom";
import { getAuth,signInWithEmailAndPassword } from "../../firebase/config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate()
  const auth = getAuth();
  const email = useRef();
  const password = useRef();
  
  const loginHandler = () => {
    console.log("login handler is working");
    signInWithEmailAndPassword(
      auth,
      email?.current?.value,
      password?.current?.value
    )
      .then((userCredential) => {
        // Signed in
        console.log('sign in user');
        const user = userCredential.user;
        // ...
        if(user) {
          toast.success("user Login successfully");
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }else{
          toast.failed("user not Login successfully");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
      });
  };
  const loginHandlerWithMongoDb = async (e) => {
    e.preventDefault();

    console.log(email, "=====>>>>> email");
    console.log(password, "=====>>>>> password");

    if (email.current.value === "" || password.current.value === "") {

      // console.log("Missing fields")
      toast.error("Missing fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });

    } else {
      dispatch(loginPending());
      const userCredential = {
        email: email.current.value,
        password: password.current.value,
      };

      console.log(userCredential);

      try {
        const response = await axios.post(
          `http://localhost:8500/api/auth/login`,
          userCredential
        );
        console.log(response?.data);
        dispatch(loginSuccess(response?.data));
        navigate("/");
        // dispatch(loginSuccess(response?.data))
        // toast.success("user Login successfully");
        // setTimeout(() => {
          // }, 3000);
          // if(response){
          // }
      } catch (error) {
        if (error) {
          toast.error(error.message);
        }
        console.log(error);
        dispatch(loginFailed(error.message));
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <div className="loginLogo">
            <img src="../../src/assets/BH_Logo_AI-01.png" alt="" />
          </div>
          {/* <span className="loginDesc">Connect with us to see new blogs.</span> */}
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email Address"
              type="email"
              className="loginInput"
              ref={email}
              />
            <input
              ref={password}
              placeholder=" Password"
              type="password"
              className="loginInput"
            />
            
            <button className="loginButton" onClick={loginHandler} >
              {" "}
              Log In
            </button>
            <span className="loginForgot">Forgot Password</span>
            <Link to={"/signup"}>
            <button className="loginRegisterButton">
              Create a new Account
            </button>
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}