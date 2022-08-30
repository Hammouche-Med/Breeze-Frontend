import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import InfoProduction from './InfoProduction';

function Production() {

const [taux_prod, setTaux_prod] = useState([])

const [tauxDetails, setTauxDetails] = useState(null)

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
            deleteTaux_prod(id);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
                    <Link
                      to="/production/create"
                      className="btn btn-primary btn-circle btn-lg float-right"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Add"
                    >
                      <i className="fa fa-plus"></i>{" "}
                    </Link>
                    <h3 className="card-title">
                      List of all current Taux de Production :{" "}
                    </h3>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Type d'travail</th>
                          <th>Horaire</th>
                          <th>Type d'Observation</th>
                          <th>Prévue /J</th>
                          <th>Prévue /M</th>
                          <th>Prévue /S</th>
                          <th>Prévue /A</th>
                          <th>Rtd /1T</th>
                          <th>Rtd /2T</th>
                          <th>Rtd /3T</th>
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
                                <td>{taux.time_meter}</td>
                                <td>{taux.schedule}</td>
                                <td>{taux.type_obs}</td>
                                <td>{taux.expected_d}</td>
                                <td>{taux.expected_m}</td>
                                <td>{taux.expected_s}</td>
                                <td>{taux.expected_y}</td>
                                <td>{taux.delay_1t}</td>
                                <td>{taux.delay_2t}</td>
                                <td>{taux.delay_3t}</td>
                                <td style= {{ textAlign: "right"}}>
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
                                  <Link
                                    className="btn btn-warning btn-circle"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Edit"
                                    to="/production/edit"
                                    state={{ 
                                        id: taux.id,
                                        name: taux.name,
                                        time_meter: taux.time_meter,
                                        schedule: taux.schedule,
                                        type_obs: taux.type_obs,
                                        expected_d: taux.expected_d,
                                        expected_m: taux.expected_m,
                                        expected_s: taux.expected_s,
                                        expected_y: taux.expected_y,
                                        delay_1t: taux.delay_1t,
                                        delay_2t: taux.delay_2t,
                                        delay_3t: taux.delay_3t,
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
                                    title="Delete"
                                    onClick={() => handeDelete(taux.id)}
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
          </div>

          {tauxDetails && <InfoProduction {...tauxDetails} />}
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Production