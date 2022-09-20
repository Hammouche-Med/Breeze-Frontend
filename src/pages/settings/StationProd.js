import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import useAuth from "../../hooks/useAuth";

function StationProd() {
  const { user } = useAuth();
  const [stations, setStations] = useState([]);
  const [statDetails, setStatDetails] = useState(null);

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
                    <h3 className="card-title">
                    Liste de tous les Stations-Production :{" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Station</th>
                          <th>OACI</th>
                          <th>OMM</th>
                          <th>Catégorie</th>
                          <th>SYNOP-taux</th>
                          <th>METAR-taux</th>
                          <th style={{ textAlign: "right" }}>Action</th>
                        </tr>
                      </thead>{" "}
                      {stations.length > 0 ? (
                        <tbody>
                          {stations.map((stat) => {
                            return (
                              <tr key={stat.id}>
                                <td>{stat.id}</td>
                                <td>{stat.name}</td>
                                <td>{stat.OACI}</td>
                                <td>{stat.OMM}</td>
                                <td>{stat.category}</td>
                                <td>{stat.SYNOP.name}</td>
                                <td>{stat.METAR.name}</td>
                                <td style={{ textAlign: "right" }}>
                                  &nbsp;&nbsp;
                                  {user.is_superuser && (
                                    <Link
                                      className="btn btn-warning btn-circle"
                                      to="/stat-prod/edit"
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
                                        synop: stat.synop,
                                        metar: stat.metar,
                                      }}
                                    >
                                      {" "}
                                      <i className="fas fa-edit"></i>
                                    </Link>
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
            {/* end content */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default StationProd;
