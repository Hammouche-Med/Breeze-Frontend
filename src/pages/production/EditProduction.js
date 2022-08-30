import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function EditProduction() {

  const location = useLocation();
  const navigate = useNavigate()
  const {
    id,
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
  } = location.state;

  const [newName, setNewName] = useState(name);
  const [newTime_meter, setNewTime_meter] = useState(time_meter);
  const [newSchedule, setNewSchedule] = useState(schedule);
  const [newType_obs, setNewType_obs] = useState(type_obs);
  const [newExpected_d, setNewExpected_d] = useState(expected_d);
  const [newExpected_m, setNewExpected_m] = useState(expected_m);
  const [newExpected_s, setNewExpected_s] = useState(expected_s);
  const [newExpected_y, setNewExpected_y] = useState(expected_y);
  const [newDelay_1t, setNewDelay_1] = useState(delay_1t);
  const [newDelay_2t, setNewDelay_2] = useState(delay_2t);
  const [newDelay_3t, setNewDelay_3] = useState(delay_3t);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [
    newName,
    newTime_meter,
    newSchedule,
    newType_obs,
    newExpected_d,
    newExpected_m,
    newExpected_s,
    newExpected_y,
    newDelay_1t,
    newDelay_2t,
    newDelay_3t,
  ]);

  
  const updateTauxProd = async (e) => {
    try {
      e.preventDefault();
      const url = "http://127.0.0.1:8000/api/v1/production/edit/";
      const token = localStorage.getItem("token");
      const updatedTauxProd = {
        name: newName,
        time_meter: newTime_meter,
        schedule: newSchedule,
        type_obs: newType_obs,
        expected_d: newExpected_d,
        expected_m: newExpected_m,
        expected_s: newExpected_s,
        expected_y: newExpected_y,
        delay_1t: newDelay_1t,
        delay_2t: newDelay_2t,
        delay_3t: newDelay_3t,
      }
      axios
        .put(url + id, updatedTauxProd, {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Production Updated Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/production", { replace: true });
          }
        });
    } catch (error) {
      setErrorMsg(error);
    }
  };
  return (
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
              <form onSubmit={updateTauxProd}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">Time meter</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTime_meter}
                      onChange={(e) => setNewTime_meter(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTxt2">Schedule</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newSchedule}
                      onChange={(e) => setNewSchedule(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputggText2">
                      Type Observation
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={newType_obs}
                      onChange={(e) => setNewType_obs(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleffInputText2">Prévue /J</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExpected_d}
                      onChange={(e) => setNewExpected_d(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInfputfText2">Prévue /M</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExpected_m}
                      onChange={(e) => setNewExpected_m(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTefxt2">Prévue /S</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExpected_s}
                      onChange={(e) => setNewExpected_s(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInpuftText2">Prévue /Y</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newExpected_y}
                      onChange={(e) => setNewExpected_y(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTexft2">Rtd /1T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newDelay_1t}
                      onChange={(e) => setNewDelay_1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTextd2">Rtd /2T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newDelay_2t}
                      onChange={(e) => setNewDelay_2(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText52">Rtd /3T</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newDelay_3t}
                      onChange={(e) => setNewDelay_3(e.target.value)}
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

export default EditProduction;
