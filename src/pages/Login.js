import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

 useEffect(() => {
   setErrorMsg("");
 }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const submittedData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1/token/",
      submittedData
    );
    if (response.status === 200) {
      setToken(response.access);
      setUser(jwtDecode(response.data.access));
      localStorage.setItem("token", JSON.stringify(response.data.access));
      localStorage.setItem(
        "user",
        JSON.stringify(jwtDecode(response.data.access))
      );
      navigate("/", { replace: true });
    } 

    }catch(err){
      setErrorMsg(err.response.data.detail)
    }
    
  };

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    {errorMsg ? (
                      <div className="alert alert-danger" role="alert">
                        {errorMsg}
                      </div>
                    ) : (
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                    )}

                    <form className="user" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          name="email"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                          ref={userRef}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setpassword(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
