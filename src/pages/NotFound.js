import React from "react";
import { useNavigate} from "react-router-dom";



function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="text-center">
        <div className="error mx-auto" data-text={404}>
          404
        </div>
        <p className="lead text-gray-800 mb-5">Page non trouvée</p>
        <p className="text-gray-500 mb-0">
          Il semble que vous ayez trouvé un bug dans la matrice...
        </p>
        <a href="#" onClick={() => navigate(-1)}>← Retourner</a>
      </div>
    </div>
  );
}

export default NotFound;
