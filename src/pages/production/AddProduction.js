import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function AddProduction() {
  const [name, setName] = useState("");
  const [start_t, setStart_t] = useState("");
  const [end_t, setEnd_t] = useState("");
  const [type_obs, setType_Obs] = useState("METAR");
  const [rate, setRate] = useState("1800");
  const [delay_1t, setDelay_1t] = useState(0);
  const [delay_2t, setDelay_2t] = useState(0);
  const [is_essential, setIs_essential] = useState(true);
  const [full_day, setFull_day] = useState(true);
  const [errorMsg, setErrorMsg] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [name, end_t, rate, type_obs, start_t, delay_1t, delay_2t, is_essential,full_day]);

  const createTaux_Prod = async (e) => {
    e.preventDefault();
    try {

      const submittedData = {
        name: name,
        start_t: start_t,
        end_t: end_t,
        rate: rate,
        type_obs: type_obs,
        delay_1t: delay_1t,
        delay_2t: delay_2t,
        is_essential: is_essential,
        full_day:full_day,
      };
      if(full_day){
        submittedData.start_t = "00:00"
        submittedData.end_t = "23:59"
      }
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
              title: "Taux-Prod créé avec succès",
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
                <h3 className="card-title">Ajouter taux de production </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={createTaux_Prod}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck2"
                      checked={full_day}
                      value={full_day}
                      onChange={(e) => setFull_day(!full_day)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck2">
                    Journée complète
                    </label>
                  </div>
                  <br></br>
                {full_day == false &&   
                <>
                <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">Début du travail</label>
                    <input
                      type="time"
                      className="form-control"
                      value={start_t}
                      onChange={(e) => setStart_t(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputTeggxt2">Fin du travail</label>
                    <input
                      type="time"
                      className="form-control"
                      value={end_t}
                      onChange={(e) => setEnd_t(e.target.value)}
                      required
                    />
                  </div>
                  </>
                  }
                 

                  <div className="form-group">
                    <label>Type d'Observation</label>
                    <select
                      value={type_obs}
                      onChange={(e) => setType_Obs(e.target.value)}
                      className="form-control"
                    >
                      <option value="METAR">METAR</option>
                      <option value="SYNOP">SYNOP</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Taux</label>
                    <select
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
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
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      name="is_superuser"
                      checked={is_essential}
                      value={is_essential}
                      onChange={(e) => setIs_essential(!is_essential)}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Essential
                    </label>
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                  Ajouter
                  </button>
                  {"  "}
                  <button onClick={() => navigate(-1)} className="btn btn-danger">
                  Annuler
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
