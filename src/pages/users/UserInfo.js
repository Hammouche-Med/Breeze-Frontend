import React from "react";

function UserInfo(props) {
  const { email, first_name, last_name,username, is_superuser, phone } = props;

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
                  <img
                    className="profile-user-img img-fluid img-circle"
                    src="assets/img/undraw_profile.svg"
                    alt="User profile picture"
                    width={200}
                  />
                </div>
                <h3 className="profile-username text-center">{first_name} {last_name}</h3>
                <p className="text-muted text-center">{is_superuser? ("Admin") : ("Staff")}</p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Email</b> <a className="float-right">{email}</a>
                  </li>
                  <li className="list-group-item">
                    <b>Phone</b> <a className="float-right">{phone}</a>
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

export default UserInfo;
