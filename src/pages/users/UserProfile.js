import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Link } from "react-router-dom";

function UserProfile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    const url = "http://127.0.0.1:8000/api/v1/users/";
    const token = localStorage.getItem("token");
    const res = await axios.get(url + user.user_id, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setProfile(() => res.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div className="card mb-4">
                  <div className="card-body text-center">
                    <img
                      src="/assets/img/undraw_profile.svg"
                      alt="avatar"
                      className="rounded-circle img-fluid"
                      style={{ width: 150 }}
                    />
                    <h5 className="my-3">
                      {profile.first_name} {profile.last_name}
                    </h5>
                    <p className="text-muted mb-1">
                      {" "}
                      {profile.is_superuser ? "Admin" : "Staff"}{" "}
                    </p>
                    <p className="text-muted mb-4">{profile.email}</p>
                    {user.is_superuser && (
                      <div className="d-flex justify-content-center mb-2">
                        <Link
                          className="btn btn-warning btn-circle"
                          to="/users/edit"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Éditer"
                          state={{
                            id: profile.id,
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            username: profile.username,
                            email: profile.email,
                            phone: profile.phone,
                            is_superuser: profile.is_superuser,
                          }}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>
                        </Link>
                        &nbsp;&nbsp;
                        <Link
                          className="btn btn-success btn-circle"
                          to="/users/reset-password"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Réinitialiser le mot de passe"
                          state={{
                            id: profile.id,
                          }}
                        >
                          {" "}
                          <i className="fas fa-lock"></i>
                        </Link>
                        &nbsp;&nbsp;
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Nom et prénom</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          {profile.first_name} {profile.last_name}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Téléphone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{profile.phone}</p>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default UserProfile;
