import React from "react";

function InfoProduction(props) {
  const {
    name,
    start_t,
    end_t,
    rate,
    expected_d,
    expected_m,
    type_obs,
    delay_1t,
    delay_2t,
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
                  <h3 className="profile-username text-center">
                    Taix-Produxtion Details:{" "}
                  </h3>
                </div>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Name</b> <a className="float-right">{name}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Type d'Observation</b>{" "}
                    <a className="float-right"> {type_obs} </a>
                  </li>
                  <li className="list-group-item">
                    <b>Début du travail</b>{" "}
                    <a className="float-right">{start_t}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Fin du travail</b> <a className="float-right">{end_t}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Taux</b>{" "}
                    <a className="float-right">
                      {rate === 1800 ? "30min" : rate === 3600 ? "1h" : "3h"}
                    </a>
                  </li>
                  <li className="list-group-item">
                    <b>Prévue /J</b> <a className="float-right">{expected_d}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Prévue ce /M</b>{" "}
                    <a className="float-right">{expected_m}</a>
                  </li>

                  <li className="list-group-item">
                    <b>Retard /1T</b>{" "}
                    <a className="float-right"> {delay_1t} </a>
                  </li>
                  <li className="list-group-item">
                    <b>Retard /2T</b>{" "}
                    <a className="float-right"> {delay_2t} </a>
                  </li>
                </ul>
              </div>
              {/* /.card-body */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoProduction;
