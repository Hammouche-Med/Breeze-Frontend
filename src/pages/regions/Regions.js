import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import RegionInfo from "./RegionInfo";
import { CSVLink } from "react-csv";
import useAuth from "../../hooks/useAuth";

function Regions() {
  const { user } = useAuth();
  const [regions, setRegions] = useState([]);
  const [regionDetails, setRegionDetails] = useState(null);

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
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteRegion(id);
          Swal.fire("Supprimé!", "Les données ont été supprimées.", "success");
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
                    {user.is_superuser && (
                      <>
                        <Link
                          to="/regions/create"
                          className="btn btn-primary btn-circle btn-lg float-right"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Ajoute"
                        >
                          <i className="fa fa-plus"></i>{" "}
                        </Link>
                      </>
                    )}

                    <CSVLink
                      className="btn btn-gray btn-circle btn-lg float-right"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="EXPORT TO CSV"
                      data={regions}
                    >
                      <i className="fa fa-print"></i>{" "}
                    </CSVLink>

                    <h3 className="card-title">
                    Liste de toutes les Régions actuelles : {" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nom</th>
                          <th>Code</th>
                          <th className="px-2" style={{ textAlign: "right" }}>
                            Action
                          </th>
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
                                <td style={{ textAlign: "right" }}>
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
                                  {user.is_superuser && (
                                    <>
                                      <Link
                                        className="btn btn-warning btn-circle"
                                        to="/regions/edit"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Éditer"
                                        state={{
                                          id: reg.id,
                                          name: reg.name,
                                          code: reg.code,
                                        }}
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
                                        title="Supprimer"
                                        onClick={() => handeDelete(reg.id)}
                                      >
                                        {" "}
                                        <i className="fas fa-trash"></i>
                                      </a>
                                    </>
                                  )}
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
