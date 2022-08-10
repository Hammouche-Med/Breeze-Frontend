import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function EditRegion() {
  const location = useLocation();
  const navigate = useNavigate()

  const { id, name, code } = location.state;

  const [newName, setNewName] = useState(name);
  const [newCode, setNewCode] = useState(code);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [newName, newCode]);

  const editRegion = async (e) => {
    try {
      e.preventDefault();
      const url = "http://127.0.0.1:8000/api/v1/region/edit/";
      const token = localStorage.getItem("token");
      const updatedRegion = {
        name: newName,
        code: newCode
      }
      axios
        .put(url + id, updatedRegion, {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Region Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/regions", { replace: true });
          }
        });
    } catch (error) {
      setErrorMsg(error);
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
                <h3 className="card-title">Update Region : </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={editRegion}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="code"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
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
  );
}

export default EditRegion;
