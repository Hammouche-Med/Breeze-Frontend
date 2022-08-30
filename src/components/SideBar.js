import { Link } from "react-router-dom"

function SideBar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">BREEZE <sup>2</sup></div>
            </a>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span></Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
                Gestion
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    <i className="fas fa-fw fa-sun" />
                    <span>Emission Meteo</span>
                </a>
                <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Consiltation des emmision:</h6>
                        <Link to="/observation" className="collapse-item"><i className="fas fa-fw fa-list" /> {" "}list  des emmision</Link>
                    </div>
                </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    <i className="fas fa-fw fa-server" />
                    <span>Station meteorologique </span>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Gestion des Station meteo:</h6>
                        <Link className="collapse-item" to="/stations-map"><i className="fas fa-fw fa-map-pin" /> {" "}Map  des Station</Link>
                        <Link className="collapse-item" to="/stations"><i className="fas fa-fw fa-list" /> {" "}list  des Station</Link>
                    </div>
                </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                    <i className="fas fa-fw fa-map" />
                    <span>Region meteorologique </span>
                </a>
                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Gestion des Region meteo:</h6>
                        <Link className="collapse-item" to="/regions"><i className="fas fa-fw fa-list" /> {" "}list  des Region</Link>
                    </div>
                </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                    <i className="fas fa-fw fa-clock" />
                    <span>Taux de Production </span>
                </a>
                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Gestion Taux-Production:</h6>
                        <Link to="/production" className="collapse-item" href="#"> <i className="fas fa-fw fa-list" /> {" "}list des Taux-Production</Link>
                    </div>
                </div>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">
                Parametre
            </div>
            {/* Nav Item - Pages Collapse Menu */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-fw fa-cog" />
                    <span>Parametre</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Profile:</h6>
                        <Link className="collapse-item" to="/users/profile"> <i className="fas fa-fw fa-user" /> {" "}espace utilisateur</Link>
                        <Link className="collapse-item" to="/users"><i className="fas fa-fw fa-users" /> {"  "}list des utilisateur</Link>
                        <a className="collapse-item" href="#">xxxxxxxxxxxxxxxx</a>
                       
                        <div className="collapse-divider" />
                        <h6 className="collapse-header">station meteorologique:</h6>
                        <a className="collapse-item" href="#">xxxxxxxxxxxxxxxx</a>
                        <a className="collapse-item" href="#">xxxxxxxxxxxxxxxx</a>
                        <a className="collapse-item" href="#">xxxxxxxxxxxxxxxx</a>
                    </div>
                </div>
            </li>
          
            {/* Divider */}
            <hr className="sidebar-divider d-none d-md-block" />
            {/* Sidebar Toggler (Sidebar) */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
        </ul>

    )
}

export default SideBar