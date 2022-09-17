import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";

function EditStatProd() {
  const location = useLocation();
  const navigate = useNavigate();
  const {id, name, oaci, omm, category, longitude, altitude, latitude, region, synop, metar } =
    location.state;
    const [newName, setNewName] = useState(name);
    const [newOaci, setNewOaci] = useState(oaci);
    const [newOmm, setNewOmm] = useState(omm);
    const [newCategory, setNewCategory] = useState(category);
    const [newLongitude, setNewLongitude] = useState(longitude);
    const [newLatitude, setNewLatitude] = useState(altitude);
    const [newAltitude, setNewAltitude] = useState(latitude);
    const [newRegion, setNewRegion] = useState(region);
    const [newSynop, setNewSynop] = useState(synop);
    const [newMetar, setNewMetar] = useState(metar);

    const [tauxList, setTauxList] = useState([]);
    

    const [errorMsg, setErrorMsg] = useState("");
  
    const getTauxList = async () => {
      const url = "http://127.0.0.1:8000/api/v1/production/all";
      const token = localStorage.getItem("token");
      const res = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + JSON.parse(token),
        },
      });
      if (res.status === 200) {
        setTauxList(() => res.data);
      }
    };
  
    useEffect(() => {
      setErrorMsg("");
      getTauxList();
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
          metar: newMetar,
          synop: newSynop,
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
                title: "Station-Production Updated Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/stat-prod", { replace: true });
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
                <h3 className="card-title">Update Station {name} </h3>
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
                    <label htmlFor="exampleInputText">Synop</label>
                    <select
                      value={newSynop}
                      onChange={(e) => setNewSynop(e.target.value)}
                      className="form-control"
                    >
                      {tauxList.length > 0 ? (
                        tauxList.map((taux) => {
                          if(taux.type_obs === "SYNOP") {
                          return (
                            <option key={taux.id} value={taux.id}>
                              {" "}
                              {taux.name}{" - "}{taux.type_obs}
                            </option>
                          );
                          }
                        })
                      ) : (
                        <option>no taux-prod found</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputText2">Metar</label>
                    <select
                      value={newMetar}
                      onChange={(e) => setNewMetar(e.target.value)}
                      className="form-control"
                    >
                      {tauxList.length > 0 ? (
                        tauxList.map((taux) => {
                          if(taux.type_obs === "METAR") {
                          return (
                            <option key={taux.id} value={taux.id}>
                              {" "}
                              {taux.name}{" - "}{taux.type_obs}
                            </option>
                          )}
                        })
                      ) : (
                        <option>no taux-prod found</option>
                      )}
                    </select>
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
  )
}

export default EditStatProd