import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";
import axios from 'axios';


function ResetPassword() {

    const location = useLocation();
    const navigate = useNavigate()
  
    const { id } = location.state;
  
    const [newPassword, setNewPassword] = useState("");
    const [newR_passsword, setNewR_passsword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
  
    useEffect(() => {
      setErrorMsg("");
    }, [newPassword, newR_passsword]);

    const updatePassword = async (e) => {
        e.preventDefault()
        const submittedData = {
            password : newPassword
        }

        if (newPassword !== newR_passsword) {
            setErrorMsg("Passwords dont match")
        }else if (newPassword.length < 6 ) {
            setErrorMsg("Passwords too short")
        }else{
            try {
                const url = "http://127.0.0.1:8000/api/v1/users/reset-password/";
                const token = localStorage.getItem("token");
              
                axios
                  .put(url + id, submittedData, {
                    headers: {
                      Authorization: "Bearer " + JSON.parse(token),
                    },
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Password Updated Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      navigate("/users", { replace: true });
                    }
                  });
              } catch (error) {
                setErrorMsg(error);
              }
        }
    }

  return (

    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title"> Reset Password: </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={updatePassword}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputText1"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Repeat Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputText2"
                      name="code"
                      value={newR_passsword}
                      onChange={(e) => setNewR_passsword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ResetPassword