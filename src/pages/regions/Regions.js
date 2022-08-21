import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import RegionInfo from "./RegionInfo";

function Regions() {
  const [regions, setRegions] = useState([]);
  const [regionDetails, setRegionDetails] = useState(null)

  useEffect(() => {
    getRegions();
  }, []);

  const getRegions = async () => {
    const url = "http://127.0.0.1:8000/api/v1/region/all";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setRegions(() => res.data);
    }
  };

  const deleteRegion = async (id) => {
    const url = "http://127.0.0.1:8000/api/v1/region/delete/";
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
          deleteRegion(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .then(() => {
        getRegions();
      });
  };

  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />

          <div className="container-fluid">
            {/* start content */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <Link
                      to="/regions/create"
                      className="btn btn-primary btn-circle btn-lg float-right"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                    >
                      <i className="fa fa-plus"></i>{" "}
                    </Link>
                    <h3 className="card-title">
                      List of all current Regions :{" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Code</th>
                          <th className="px-2" style= {{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>{" "}
                      {regions.length > 0 ? (
                        <tbody>
                          {regions.map((reg) => {
                            return (
                              <tr key={reg.id}>
                                <td>{reg.id}</td>
                                <td>{reg.name}</td>
                                <td>{reg.code}</td>
                                <td style= {{ textAlign: "right"}}>
                                  <a
                                    className="btn btn-info btn-circle"
                                    href="#"
                                    data-placement="top"
                                    title="Info"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => setRegionDetails(reg)}
                                  >
                                    <i className="fas fa-info-circle"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  <Link
                                    className="btn btn-warning btn-circle"
                                    to="/regions/edit"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit"
                                    state={{ id: reg.id,  name: reg.name, code: reg.code}}
                                  >
                                    {" "}
                                    <i className="fas fa-edit"></i>
                                  </Link>
                                  &nbsp;&nbsp;
                                  <a
                                    className="btn btn-danger btn-circle"
                                    href="#"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Delete"

                                    onClick={() => handeDelete(reg.id)}
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
                            <td>Loading...</td>
                            <td></td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {regionDetails && <RegionInfo {...regionDetails} />}
            {/* end content */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Regions;
