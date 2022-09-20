import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";

function AddUser() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [r_password, setR_Password] = useState("");
  const [is_superuser, setIs_superuser] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [
    first_name,
    last_name,
    username,
    email,
    phone,
    r_password,
    password,
    is_superuser,
  ]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const submittedData = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        phone: phone,
        password: password,
        password2: r_password,
        is_superuser: is_superuser,
        is_staff : true 
      };
      if (password !== r_password) {
        setErrorMsg("Les mots de passe ne correspondent pas");
      } else {
        const url = "http://127.0.0.1:8000/api/v1/users/create";
        const token = localStorage.getItem("token");
        const res = await axios.post(url, submittedData, {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        }).then(res=> {
          if (res.status === 201) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Utilisateur créé avec succès",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/users", { replace: true });
        }} );
        
      }
    } catch (error) {
        setErrorMsg(error)
    }
  };

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
                <h3 className="card-title">Ajouter un utilisateur : </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form  onSubmit={createUser}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      name="first_name"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="last_name"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText3">Nom d'utilisateur</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText3"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputphone">Téléphone</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputphone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword2">
                    Répéter le mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                      name="r_password"
                      value={r_password}
                      onChange={(e) => setR_Password(e.target.value)}
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="is_superuser"
                      value={is_superuser}
                      onChange={(e) => setIs_superuser(!is_superuser)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Admin
                    </label>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>{" "}
                  <button onClick={() => navigate(-1)} className="btn btn-danger">
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

export default AddUser;
