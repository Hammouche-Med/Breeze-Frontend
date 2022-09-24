import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { CSVLink } from "react-csv";

function YearReport() {
  const [year, setYear] = useState(moment().format("YYYY-MM-DD"));
  const [type, setType] = useState("METAR");
  const [reports, setReports] = useState([]);

  const getReport = async () => {
    const options = {
      date: year,
      obs_type: type,
    };
    const url = "http://127.0.0.1:8000/api/v1/report/all/year";
    const token = localStorage.getItem("token");
    const res = await axios.post(url, options, {
      headers: {
        Authorization: "Bearer " + JSON.parse(token),
      },
    });
    if (res.status === 200) {
      setReports(() => res.data);
    }
  };
  useEffect(() => {
    getReport();
  }, [year, type]);

  const csvMetarHeader = [
    { label: "Station", key: "stat_info.stat_name" },
    { label: "OACI", key: "stat_info.stat_oaci" },
    { label: "OMM", key: "stat_info.stat_omm" },
    { label: "Prévue", key: "stat_info.expected_y" },
    { label: "Reçue", key: "rec_num" },
    { label: "Prod", key: "month_prod" },
    { label: "H+3", key: "s_prodh1" },
    { label: "H+5", key: "s_prodh2" },
    { label: "Rtd<H+33", key: "s_rtdH1" },
    { label: "Rtd<H+49", key: "s_rtdH2" },
    { label: "Rtd>H+49", key: "s_rtdH3" },
  ];
  const csvSynopHeader = [
    { label: "Station", key: "stat_info.stat_name" },
    { label: "OACI", key: "stat_info.stat_oaci" },
    { label: "OMM", key: "stat_info.stat_omm" },
    { label: "Prévue", key: "stat_info.expected_y" },
    { label: "Reçue", key: "rec_num" },
    { label: "Prod", key: "month_prod" },
    { label: "H+5", key: "s_prodh1" },
    { label: "H+10", key: "s_prodh2" },
    { label: "Rtd<2H", key: "s_rtdH1" },
    { label: "Rtd<6H", key: "s_rtdH2" },
    { label: "Rtd>6H", key: "s_rtdH3" },
  ];
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />

          <div className="container-fluid">
            {/* start content */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    {type === "METAR" ? (
                      <CSVLink
                        headers={csvMetarHeader}
                        className="btn btn-gray btn-circle btn-lg float-right"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="EXPORTER LE RAPPORT METAR VERS CSV "
                        data={reports}
                      >
                        <i className="fa fa-print"></i>{" "}
                      </CSVLink>
                    ) : (
                      <CSVLink
                        headers={csvSynopHeader}
                        className="btn btn-gray btn-circle btn-lg float-right"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="EXPORTER LE RAPPORT SYNOPTIQUE VERS CSV"
                        data={reports}
                      >
                        <i className="fa fa-print"></i>{" "}
                      </CSVLink>
                    )}
                    <h3 className="card-title">
                      Rapport Annuel de la Production des Stations
                      Méteorologique :{" "}
                    </h3>
                  </div>
                  <div className="card-header">
                    <div className="row">
                      <div className="col-6">
                        <select
                          className="form-control form-control-lg"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="METAR">METAR</option>
                          <option value="SYNOP">SYNOP</option>
                        </select>
                      </div>
                      <div className="col-6">
                        <input
                          className="form-control form-control-lg"
                          type="date"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>Station</th>
                          <th>OACI</th>
                          <th>OMM</th>
                          <th>Prévue</th>
                          <th>Reçue</th>
                          <th>Prod</th>
                          {type === "METAR" ? (
                            <th>Rtd{"<"}H+3 </th>
                          ) : (
                            <th>Rtd{"<"}H+5 </th>
                          )}
                          {type === "METAR" ? (
                            <th>Rtd{"<"}H+5 </th>
                          ) : (
                            <th>Rtd{"<"}H+10 </th>
                          )}
                          {type === "METAR" ? (
                            <th>Rtd{"<"}H+33 </th>
                          ) : (
                            <th>Rtd{"<"}2H </th>
                          )}
                          {type === "METAR" ? (
                            <th>Rtd{"<"}H+49 </th>
                          ) : (
                            <th>Rtd{"<"}6H </th>
                          )}
                          {type === "METAR" ? (
                            <th>Rtd{">"}H+49 </th>
                          ) : (
                            <th>Rtd{">"}6H </th>
                          )}
                        </tr>
                      </thead>{" "}
                      {reports.length > 0 ? (
                        <tbody>
                          {reports.map((rpt) => {
                            return (
                              <tr key={rpt.stat_info.stat_id}>
                                <td>{rpt.stat_info.stat_name}</td>
                                <td>{rpt.stat_info.stat_oaci}</td>
                                <td>{rpt.stat_info.stat_omm}</td>
                                {rpt.stat_info.taux ? (
                                  <td>{rpt.stat_info.expected_y}</td>
                                ) : (
                                  <td>{rpt.stat_info.expected_y}</td>
                                )}
                                <td>{rpt.rec_num}</td>
                                <td>{rpt.year_prod}%</td>
                                <td>{rpt.s_prodh1}%</td>
                                <td>{rpt.s_prodh2}%</td>
                                <td>{rpt.s_rtdH1}%</td>
                                <td>{rpt.s_rtdH2}%</td>
                                <td>{rpt.s_rtdH3}%</td>

                                
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>

                            <td></td>
                            <td></td>
                            <td>Loading...</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* end content */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default YearReport;
