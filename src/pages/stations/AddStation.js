import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function AddStation() {
  const [name, setName] = useState("");
  const [oaci, setOaci] = useState("");
  const [omm, setOmm] = useState("");
  const [category, setCategory] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [altitude, setAltitude] = useState("");
  const [region, setRegion] = useState("");
  const [allRegions, setAllRegions] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const getRegions = async () => {
    const url = "http://127.0.0.1:8000/api/v1/region/all";
    const token = localStorage.getItem("token");
    const res = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setAllRegions(() => res.data);
    }
  };
  useEffect(() => {
    setErrorMsg("");
    getRegions();
  }, [
    name,
    oaci,
    omm,
    category,
    longitude,
    altitude,
    latitude,
    region,
  ]);
  const createStation = async (e) => {
    e.preventDefault();
    if (!region) {
      setErrorMsg("choisie un region");
    } else {
      try {
        const submittedData = {
          name: name,
          OACI: oaci,
          OMM: omm,
          category: category,
          longitude: longitude,
          altitude: altitude,
          latitude: latitude,
          region: region,
        };
        const url = "http://127.0.0.1:8000/api/v1/station/create";
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
                title: "Station créée avec succès",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/stations", { replace: true });
            }
          });
      } catch (error) {
        setErrorMsg("error ocurred");
      }
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
                <h3 className="card-title">Ajouter une Station: </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={createStation}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">OACI</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      name="oaci"
                      value={oaci}
                      onChange={(e) => setOaci(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">OMM</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="omm"
                      value={omm}
                      onChange={(e) => setOmm(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Region</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="form-control"
                    >
                      <option selected>Choisir un Region</option>
                      {allRegions.length > 0 ? (
                        allRegions.map((reg) => {
                          return (
                            <option key={reg.id} value={reg.id}>
                              {" "}
                              {reg.name}{" "}
                            </option>
                          );
                        })
                      ) : (
                        <option>aucune région trouvée</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Catégorie</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Longitude</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputText2"
                      name="longitude"
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Latitude</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputText2"
                      name="latitude"
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Altitude</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputText2"
                      name="altitude"
                      value={altitude}
                      onChange={(e) => setAltitude(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>{" "}
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

export default AddStation;
