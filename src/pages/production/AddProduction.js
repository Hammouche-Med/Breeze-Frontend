import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function AddProduction() {
  const [name, setName] = useState("");
  const [time_meter, setTime_meter] = useState("");
  const [schedule, setSchedule] = useState("");
  const [type_obs, setType_Obs] = useState("");
  const [expected_d, setExpected_d] = useState(0);
  const [expected_m, setExpected_m] = useState(0);
  const [expected_s, setExpected_s] = useState(0);
  const [expected_y, setExpected_y] = useState(0);
  const [delay_1t, setDelay_1t] = useState(0);
  const [delay_2t, setDelay_2t] = useState(0);
  const [delay_3t, setDelay_3t] = useState(0);
  const [errorMsg, setErrorMsg] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [
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
  ]);

  const createTaux_Prod = async (e) => {
    e.preventDefault();
    try {
      const submittedData = {
        name: name,
        time_meter: time_meter,
        schedule: schedule,
        type_obs: type_obs,
        expected_d: expected_d,
        expected_m: expected_m,
        expected_s: expected_s,
        expected_y: expected_y,
        delay_1t: delay_1t,
        delay_2t: delay_2t,
        delay_3t: delay_3t,
      };
      const url = "http://127.0.0.1:8000/api/v1/production/create";
      const token = localStorage.getItem("token");
      const res = await axios
        .post(url, submittedData, {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Taux-Prod Created Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/production", { replace: true });
          }
        });
    } catch (error) {
      setErrorMsg("error ocurred");
    }
  };
  return  (

    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          <div className="container-fluid">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Add Taux de Production </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form  onSubmit={createTaux_Prod}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">Time meter</label>
                    <input
                      type="text"
                      className="form-control"
                      value={time_meter}
                      onChange={(e) => setTime_meter(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTxt2">Schedule</label>
                    <input
                      type="text"
                      className="form-control"
                      value={schedule}
                      onChange={(e) => setSchedule(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputggText2">Type Observation</label>
                    <input
                      type="text"
                      className="form-control"
                      value={type_obs}
                      onChange={(e) => setType_Obs(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleffInputText2">Prévue /J</label>
                    <input
                      type="number"
                      className="form-control"
                      value={expected_d}
                      onChange={(e) => setExpected_d(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInfputfText2">Prévue /M</label>
                    <input
                      type="number"
                      className="form-control"
                      value={expected_m}
                      onChange={(e) => setExpected_m(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTefxt2">Prévue /S</label>
                    <input
                      type="number"
                      className="form-control"
                      value={expected_s}
                      onChange={(e) => setExpected_s(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInpuftText2">Prévue /Y</label>
                    <input
                      type="number"
                      className="form-control"
                      value={expected_y}
                      onChange={(e) => setExpected_y(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTexft2">Rtd /1T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={delay_1t}
                      onChange={(e) => setDelay_1t(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTextd2">Rtd /2T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={delay_2t}
                      onChange={(e) => setDelay_2t(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText52">Rtd /3T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={delay_3t}
                      onChange={(e) => setDelay_3t(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddProduction;
