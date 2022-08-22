import React from 'react'

function BreadCrumb() {
  return (
    <div className="row">
    <div className="col">
      <nav
        aria-label="breadcrumb"
        className="bg-light rounded-3 p-3 mb-4"
      >
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">User</a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
          >
            User Profile
          </li>
        </ol>
      </nav>
    </div>
  </div>
  )
}

export default BreadCrumb