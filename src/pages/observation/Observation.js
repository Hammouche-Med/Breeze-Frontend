import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import ObsInfo from "./ObsInfo";

function Observation() {

  const [observations, setObservations] = useState([]);
  const [obsDetails, setObsDetails] = useState(null)

  useEffect(() => {
    getObs();
  }, []);

  const getObs = async () => {
    const url = "http://127.0.0.1:8000/api/v1/observation/all";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
        setObservations(() => res.data);
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
                    Liste de toutes les Observations récentes :{" "}
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
                          <th>Date Obs</th>
                          <th>Date Reçue</th>
                          <th>Type Obs</th>
                          <th>Contenue</th>
                          <th>Action</th>
                        </tr>
                      </thead>{" "}
                      {observations.length > 0 ? (
                        <tbody>
                          {observations.map((obs) => {
                            return (
                              <tr key={obs.id}>
                                <td>{obs.id}</td>
                                <td>{obs.station_name}</td>
                                <td>{obs.station_oaci}</td>
                                <td>{obs.station_omm}</td>
                                <td>{obs.obs_date} { moment(obs.obs_time, "HH:mm:ss").format('HH:mm A') }</td>
                                <td>{obs.rec_date} {moment(obs.rec_time, "HH:mm:ss").format('HH:mm A') }</td>
                                <td>{obs.type}</td>
                                <td>{obs.content}</td>
                                <td style= {{ textAlign: "right"}}>
                                  <a
                                    className="btn btn-info btn-circle"
                                    href="#"
                                    data-placement="top"
                                    title="Info"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter"
                                    onClick={() => setObsDetails(obs)}
                                  >
                                    <i className="fas fa-info-circle"></i>
                                  </a>
                                  &nbsp;&nbsp;
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
            {obsDetails && <ObsInfo {...obsDetails} />}
            {/* end content */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Observation