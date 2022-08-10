import React from 'react'

function RegionInfo(props) {

  const { code, name } = props;
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
                
              <h3 className="profile-username text-center">Region Details: </h3>
              </div>
              <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Name</b> <a className="float-right">{name}</a>
                </li>
                <li className="list-group-item">
                  <b>Code</b> <a className="float-right">{code}</a>
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

export default RegionInfo