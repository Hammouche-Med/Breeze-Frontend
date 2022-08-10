import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";
import UserInfo from "./UserInfo";

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUsers();
    console.log("i run once");
  }, []);

  const getUsers = async () => {
    const url = "http://127.0.0.1:8000/api/v1/users/";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      console.log("reazzzz", res.data);
      setUsersList(() => res.data);
      console.log("uzerzzzz", usersList);
      setIsLoading(false);
    }
  };

  const getuserDetails = (user) => {
    setUserDetails(user);
  };
  const deletuser = async (id) => {
    const url = "http://127.0.0.1:8000/api/v1/users/delete/";
    const token = localStorage.getItem("token");
    axios.delete(url + id, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
  };
  const handeDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          deletuser(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .then(() => {
        getUsers();
      });
  };

  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <Link
                      to="/users/create"
                      className="btn btn-primary btn-circle btn-lg float-right"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                    >
                      <i className="fa fa-plus"></i>{" "}
                    </Link>
                    <h3 className="card-title">List of all current users : </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>User Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      {usersList.length > 0 ? (
                        <tbody>
                          {usersList.map((user) => {
                            return (
                              <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.email}</td>
                                {user.is_superuser ? (
                                  <td>Admin</td>
                                ) : (
                                  <td>Staff</td>
                                )}
                                <td>
                                  <a
                                    className="btn btn-info btn-circle"
                                    href="#"
                                    data-placement="top"
                                    title="Info"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => getuserDetails(user)}
                                  >
                                    <i className="fas fa-info-circle"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  <Link
                                    className="btn btn-warning btn-circle"
                                    to="users/edit/:id"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit"
                                  >
                                    {" "}
                                    <i className="fas fa-exclamation-triangle"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <a
                                    className="btn btn-danger btn-circle"
                                    href="#"
                                    onClick={() => handeDelete(user.id)}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete"
                                  >
                                    {" "}
                                    <i className="fas fa-trash"></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Loading...</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>
            {userDetails && <UserInfo {...userDetails} />}
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Users;
