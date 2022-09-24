import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import useAuth from "../../hooks/useAuth";
import InfoProduction from "./InfoProduction";

function Production() {
  const { user } = useAuth();
  const [taux_prod, setTaux_prod] = useState([]);
  const [tauxDetails, setTauxDetails] = useState(null);

  useEffect(() => {
    getTaux_prod();
  }, []);

  const getTaux_prod = async () => {
    const url = "http://127.0.0.1:8000/api/v1/production/all";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setTaux_prod(() => res.data);
    }
  };

  const deleteTaux_prod = async (id) => {
    const url = "http://127.0.0.1:8000/api/v1/production/delete/";
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
          deleteTaux_prod(id);
          Swal.fire("Supprimé!", "Les données ont été supprimées.", "success");
        }
      })
      .then(() => {
        getTaux_prod();
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
                    {user.is_superuser && (
                      <>
                        {" "}
                        <Link
                          to="/production/create"
                          className="btn btn-primary btn-circle btn-lg float-right"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Ajoute"
                        >
                          <i className="fa fa-plus"></i>{" "}
                        </Link>
                      </>
                    )}
                    <h3 className="card-title">
                    Liste de tous les taux de production actuels :{" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nom</th>
                          <th>Type d'Observation</th>
                          <th>Début du travail</th>
                          <th>Fin du travail</th>
                          <th>Taux</th>
                          <th>Essential</th>
                          <th>Prévue /J</th>
                          <th>Prévue ce /M</th>
                          <th>Rtd /1T</th>
                          <th>Rtd /2T</th>
                          <th>Action</th>
                        </tr>
                      </thead>{" "}
                      {taux_prod.length > 0 ? (
                        <tbody>
                          {taux_prod.map((taux) => {
                            return (
                              <tr key={taux.id}>
                                <td>{taux.id}</td>
                                <td>{taux.name}</td>
                                <td>{taux.type_obs}</td>
                                <td>{taux.start_t}</td>
                                <td>{taux.end_t}</td>
                                <td>
                                  {taux.rate === 1800
                                    ? "30min"
                                    : taux.rate === 3600
                                    ? "1h"
                                    : "3h"}
                                </td>
                                <td>{taux.is_essential ? "True" : "False"}</td>
                                <td>{taux.expected_d}</td>
                                <td>{taux.expected_m}</td>
                                <td>{taux.delay_1t}</td>
                                <td>{taux.delay_2t}</td>
                                <td style={{ textAlign: "right" }}>
                                  <a
                                    className="btn btn-info btn-circle"
                                    href="#"
                                    data-placement="top"
                                    title="Info"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => setTauxDetails(taux)}
                                  >
                                    <i className="fas fa-info-circle"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  {user.is_superuser && (
                                    <>
                                      <Link
                                        className="btn btn-warning btn-circle"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Éditer"
                                        to="/production/edit"
                                        state={{
                                          id: taux.id,
                                          name: taux.name,
                                          start_t: taux.start_t,
                                          end_t: taux.end_t,
                                          rate: taux.rate,
                                          type_obs: taux.type_obs,
                                          delay_1t: taux.delay_1t,
                                          delay_2t: taux.delay_2t,
                                          is_essential: taux.is_essential,
                                          full_day: taux.full_day,
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
                                        onClick={() => handeDelete(taux.id)}
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

          {tauxDetails && <InfoProduction {...tauxDetails} />}
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Production;
