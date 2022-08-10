import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'


function AddRegion() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [name, code
  ]);

    const createRegion = async (e) => {
        e.preventDefault();
        try {
          const submittedData = {
            name: name,
            code: code,
          };
            const url = "http://127.0.0.1:8000/api/v1/region/create";
            const token = localStorage.getItem("token");
            const res = await axios.post(url, submittedData, {
              headers: {
                Authorization: "Bearer " + JSON.parse(token),
              },
            }).then(res=> {
              if (res.status === 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Region Created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/regions", { replace: true });
            }} );
            
        } catch (error) {
            setErrorMsg("error ocurred")
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
                <h3 className="card-title">Add Region </h3>
              </div>
              {errorMsg && (
                <div className="alert alert-danger" role="alert">
                  {errorMsg}
                </div>
              )}
              {/* /.card-header */}
              {/* form start */}
              <form  onSubmit={createRegion}>
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
                    <label htmlFor="exampleInputText2">Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputText2"
                      name="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
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
  )
}

export default AddRegion