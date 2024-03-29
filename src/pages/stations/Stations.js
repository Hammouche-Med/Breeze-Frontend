import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { CSVLink } from "react-csv";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

function Stations() {
  const { user } = useAuth();
  const [stations, setStations] = useState([]);
  const [stationDetails, setStationDetails] = useState(null);

  useEffect(() => {
    getStations();
  }, []);

  const getStations = async () => {
    const url = "http://127.0.0.1:8000/api/v1/station/all";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setStations(() => res.data);
    }
  };

  const deleteStations = async (id) => {
    const url = "http://127.0.0.1:8000/api/v1/station/delete/";
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
          deleteStations(id);
          Swal.fire("Supprimé!", "Les données ont été supprimées.", "success");
        }
      })
      .then(() => {
        getStations();
      });
  };

  const csvHeader = [
    { label: "ID", key: "id" },
    { label: "OACI", key: "OACI" },
    { label: "OMM", key: "OMM" },
    { label: "Region", key: "reg.name" },
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "longitude", key: "longitude" },
    { label: "latitude", key: "latitude" },
    { label: "altitude", key: "altitude" },
  ];
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
                          to="/stations/create"
                          className="btn btn-primary btn-circle btn-lg float-right"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Add"
                        >
                          <i className="fa fa-plus"></i>{" "}
                        </Link>
                      </>
                    )}

                    <CSVLink
                      headers={csvHeader}
                      className="btn btn-gray btn-circle btn-lg float-right"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="EXPORT TO CSV"
                      data={stations}
                    >
                      <i className="fa fa-print"></i>{" "}
                    </CSVLink>
                    <h3 className="card-title">
                    Liste de toutes les Stations actuelles :{" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>OACI</th>
                          <th>OMM</th>
                          <th>Region</th>
                          <th>Nom</th>
                          <th>Catégorie</th>
                          <th>Longitude</th>
                          <th>Latitude</th>
                          <th>Altitude</th>
                          <th>Action</th>
                        </tr>
                      </thead>{" "}
                      {stations.length > 0 ? (
                        <tbody>
                          {stations.map((stat) => {
                            return (
                              <tr key={stat.id}>
                                <td>{stat.id}</td>
                                <td>{stat.OACI}</td>
                                <td>{stat.OMM}</td>
                                <td>{stat.reg.name}</td>
                                <td>{stat.name}</td>
                                <td>{stat.category}</td>
                                <td>{stat.longitude}</td>
                                <td>{stat.latitude}</td>
                                <td>{stat.altitude}</td>
                                <td>
                                  <a
                                    className="btn btn-info btn-circle"
                                    href="#"
                                    data-placement="top"
                                    title="Info"
                                  >
                                    <i className="fas fa-info-circle"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  {user.is_superuser && (
                                    <>
                                      <Link
                                        className="btn btn-warning btn-circle"
                                        to="/stations/edit"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Éditer"
                                        state={{
                                          id: stat.id,
                                          name: stat.name,
                                          oaci: stat.OACI,
                                          omm: stat.OMM,
                                          category: stat.category,
                                          longitude: stat.longitude,
                                          altitude: stat.altitude,
                                          latitude: stat.latitude,
                                          region: stat.region,
                                          region_name: stat.region_name,
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
                                        onClick={() => handeDelete(stat.id)}
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
                            <td></td>

                            <td></td>
                            <td></td>
                            <td>Loading...</td>
                            <td></td>
                            <td></td>
                            <td></td>
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
            {/* end content */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Stations;
