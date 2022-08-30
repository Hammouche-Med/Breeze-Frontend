import React from "react";
import formatDate from "../../tools/Formatter";


function ObsInfo(props) {
  const {
    station_name,
    station_oaci,
    station_omm,
    obs_date,
    rec_date,
    type,
    content
  } = props;

  return (
    <div>
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="card card-primary card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                
              <h3 className="profile-username text-center">Observation Details: </h3>
              </div>
              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Station</b> <a className="float-right">{station_name}</a>
                </li>
                <li className="list-group-item">
                  <b>OACI</b> <a className="float-right"> {station_oaci} </a>
                </li>
                <li className="list-group-item">
                  <b>OMM</b> <a className="float-right"> {station_omm} </a>
                </li>
                <li className="list-group-item">
                  <b>Date Obs</b> <a className="float-right"> {formatDate(obs_date)} </a>
                </li>
                <li className="list-group-item">
                  <b>Date Reçue</b> <a className="float-right"> {formatDate(rec_date)} </a>
                </li>
                <li className="list-group-item">
                  <b>Type Obs</b> <a className="float-right"> {type} </a>
                </li>
                <li className="list-group-item">
                  <b>Contenue</b> <a className="float-right"> {content} </a>
                </li>
              </ul>
            </div>
            {/* /.card-body */}
          </div>

         
        </div>
      </div>
    </div>
  </div>
  )
}

export default ObsInfo;
