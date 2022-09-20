import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function EditStation() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    name,
    oaci,
    omm,
    category,
    longitude,
    altitude,
    latitude,
    region,
    region_name,
  } = location.state;

  const [newName, setNewName] = useState(name);
  const [newOaci, setNewOaci] = useState(oaci);
  const [newOmm, setNewOmm] = useState(omm);
  const [newCategory, setNewCategory] = useState(category);
  const [newLongitude, setNewLongitude] = useState(longitude);
  const [newLatitude, setNewLatitude] = useState(altitude);
  const [newAltitude, setNewAltitude] = useState(latitude);
  const [newRegion, setNewRegion] = useState(region);
  const [allRegions, setAllRegions] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");

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
  }, []);

  const updateStation = async (e) => {
    try {
      e.preventDefault();
      const url = "http://127.0.0.1:8000/api/v1/station/edit/";
      const token = localStorage.getItem("token");
      const submittedData = {
        name: newName,
        OACI: newOaci,
        OMM: newOmm,
        category: newCategory,
        longitude: newLongitude,
        altitude: newAltitude,
        latitude: newLatitude,
        region: newRegion,
      };
      axios
        .put(url + id, submittedData, {
          headers: {
            Authorization: "Bearer " + JSON.parse(token),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Station mise à jour avec succès",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/stations", { replace: true });
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
                <h3 className="card-title"> Mettre à jour la station :</h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form onSubmit={updateStation}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputText1">OACI</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText1"
                      name="oaci"
                      value={newOaci}
                      onChange={(e) => setNewOaci(e.target.value)}
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
                      value={newOmm}
                      onChange={(e) => setNewOmm(e.target.value)}
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
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Region</label>
                    <select
                      value={newRegion}
                      onChange={(e) => setNewRegion(e.target.value)}
                      className="form-control"
                    >
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
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
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
                      value={newLongitude}
                      onChange={(e) => setNewLongitude(e.target.value)}
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
                      value={newLatitude}
                      onChange={(e) => setNewLatitude(e.target.value)}
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
                      value={newAltitude}
                      onChange={(e) => setNewAltitude(e.target.value)}
                      required
                    />
                  </div>
                </div>
                {/* /.card-body */}
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    Mettre à jour
                  </button>{" "}
                  <button
                    onClick={() => navigate(-1)}
                    className="btn btn-danger"
                  >
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

export default EditStation;
