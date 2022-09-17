import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function EditProduction() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, name, start_t, end_t, rate, type_obs, delay_1t, delay_2t,is_essential,full_day } =
    location.state;

  const [newName, setNewName] = useState(name);
  const [newStart_t, setNewStart_t] = useState(start_t);
  const [newEnd_t, setNewEnd_t] = useState(end_t);
  const [newRate, setNewRate] = useState(rate);
  const [newType_obs, setNewType_obs] = useState(type_obs);
  const [newDelay_1t, setNewDelay_1] = useState(delay_1t);
  const [newDelay_2t, setNewDelay_2] = useState(delay_2t);
  const [newIs_essential, setNewIs_essential] = useState(is_essential);
  const [newFull_day, setNewFull_day] = useState(full_day);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setErrorMsg("");
  }, [
    newName,
    newStart_t,
    newEnd_t,
    newRate,
    newType_obs,
    newDelay_1t,
    newDelay_2t,
    newIs_essential,
    newFull_day
  ]);

  const updateTauxProd = async (e) => {
    try {
      e.preventDefault();
      const url = "http://127.0.0.1:8000/api/v1/production/edit/";
      const token = localStorage.getItem("token");
      const updatedTauxProd = {
        name: newName,
        start_t: newStart_t,
        end_t: newEnd_t,
        rate: newRate,
        type_obs: newType_obs,
        delay_1t: newDelay_1t,
        delay_2t: newDelay_2t,
        is_essential: newIs_essential,
        full_day: newFull_day
      };
      if(newFull_day){
        updatedTauxProd.start_t = "00:00"
        updatedTauxProd.end_t = "23:59"
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
              title: "Taux-Prod Updated Successfully",
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
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck2"
                      checked={newFull_day}
                      value={newFull_day}
                      onChange={(e) => setNewFull_day(!newFull_day)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck2">
                      Full-day
                    </label>
                  </div>
                  <br></br>
                {newFull_day == false &&   
                <>
                  <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">
                      Début du travail
                    </label>
                    <input
                      type="time"
                      className="form-control"
                      value={newStart_t}
                      onChange={(e) => setNewStart_t(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">Fin du travail</label>
                    <input
                      type="time"
                      className="form-control"
                      value={newEnd_t}
                      onChange={(e) => setNewEnd_t(e.target.value)}
                      required
                    />
                  </div>
                </>}
                  <div className="form-group">
                    <label>Type Observation</label>
                    <select
                      value={newType_obs}
                      onChange={(e) => setNewType_obs(e.target.value)}
                      className="form-control"
                    >
                      <option value="METAR">METAR</option>
                      <option value="SYNOP">SYNOP</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Taux </label>
                    <select
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      className="form-control"
                    >
                      <option value="1800">30min</option>
                      <option value="3600">1h</option>
                      <option value="10800">3h</option>
                    </select>
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
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="is_superuser"
                      checked={newIs_essential}
                      value={newIs_essential}
                      onChange={(e) => setNewIs_essential(!newIs_essential)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Essential
                    </label>
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
