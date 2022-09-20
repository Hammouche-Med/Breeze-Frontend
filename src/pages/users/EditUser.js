import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, first_name, last_name, username, email,phone, is_superuser } = location.state;

  const [newFirst_name, setNewFirst_name] = useState(first_name);
  const [newLast_name, setNewLast_name] = useState(last_name);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newIs_superuser, setNewIs_superuser] = useState(is_superuser);

  const [errorMsg, setErrorMsg] = useState("");


  const updateUser = async (e) => {
    e.preventDefault()
   
    try {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/api/v1/users/update/";
        const token = localStorage.getItem("token");
        const submittedData = {
            first_name: newFirst_name,
            last_name: newLast_name,
            username: newUsername,
            email: newEmail,
            phone: newPhone,
            is_superuser: newIs_superuser,
        }
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
                title: "Utilisateur mis à jour avec succès",
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
                <h3 className="card-title">Mettre à jour l'utilisateur: </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={updateUser}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      placeholder="First Name"
                      name="first_name"
                      value={newFirst_name}
                      onChange={(e) => setNewFirst_name(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      placeholder="Last Name"
                      name="last_name"
                      value={newLast_name}
                      onChange={(e) => setNewLast_name(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText3">Nom d'utilisateur</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText3"
                      placeholder="UserName"
                      name="username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      name="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Téléphone</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter number"
                      name="phone"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="is_superuser"
                      checked={newIs_superuser}
                      value={newIs_superuser}
                      onChange={(e) => setNewIs_superuser(!newIs_superuser)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Admin
                    </label>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                    Mettre à jour
                  </button>{" "}
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-danger"
                  >
                    Annuler
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
  );
}

export default EditUser;
