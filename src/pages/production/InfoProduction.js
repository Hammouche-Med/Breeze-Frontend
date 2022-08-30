import React from 'react'

function InfoProduction(props) {

  const {
    name,
    time_meter,
    schedule,
    type_obs,
    expected_d,
    expected_m,
    expected_s,
    expected_y,
    delay_1t,
    delay_2t,
    delay_3t,
  } = props

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
                
              <h3 className="profile-username text-center">Taix-Produxtion Details: </h3>
              </div>
              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Name</b> <a className="float-right">{name}</a>
                </li>
                <li className="list-group-item">
                  <b>Type d'travail</b> <a className="float-right"> {time_meter} </a>
                </li>
                <li className="list-group-item">
                  <b>Horaire</b> <a className="float-right"> {schedule} </a>
                </li>
                <li className="list-group-item">
                  <b>Type d'Observation</b> <a className="float-right"> {type_obs} </a>
                </li>
                <li className="list-group-item">
                  <b>Prévue /J</b> <a className="float-right"> {expected_d} </a>
                </li>
                <li className="list-group-item">
                  <b>Prévue /M</b> <a className="float-right"> {expected_m} </a>
                </li>
                <li className="list-group-item">
                  <b>Prévue /S</b> <a className="float-right"> {expected_s} </a>
                </li>
                <li className="list-group-item">
                  <b>Prévue /Y</b> <a className="float-right"> {expected_y} </a>
                </li>
                <li className="list-group-item">
                  <b>Retard /1T</b> <a className="float-right"> {delay_1t} </a>
                </li>
                <li className="list-group-item">
                  <b>Retard /2T</b> <a className="float-right"> {delay_1t} </a>
                </li>
                <li className="list-group-item">
                  <b>Retard /3T</b> <a className="float-right"> {delay_3t} </a>
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

export default InfoProduction