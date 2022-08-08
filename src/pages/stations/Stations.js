import React from 'react'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import SideBar from '../../components/SideBar'

function Stations() {
  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          {/* start content */}
          stations
          {/* end content */}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Stations