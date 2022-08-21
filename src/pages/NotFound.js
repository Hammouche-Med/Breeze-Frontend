import React from "react";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";



function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="text-center">
        <div className="error mx-auto" data-text={404}>
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page Not Found</p>
        <p className="text-gray-500 mb-0">
          It looks like you found a glitch in the matrix...
        </p>
        <a href="#" onClick={() => navigate(-1)}>← Go Back</a>
      </div>
    </div>
  );
}

export default NotFound;
