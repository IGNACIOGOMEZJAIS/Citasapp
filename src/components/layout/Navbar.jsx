import { NavLink } from "react-router-dom";

export const Navbar = ({login,handlerLogout}) =>{

return (
<nav className="navbar navbar-expand-lg bg-body-tertiary navbar  border-bottom border-body bg-dark" data-bs-theme="dark" >
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/citas">Gestion de Citas Medicas</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
       <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to="/citas">
            Citas Medicas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/citas/register">
            Solicitar Turno
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/citas/citacurso">
            Comenzar Consultas
          </NavLink>
        </li>



       </ul>
     
      
    </div>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
        <span className="nav-item nav-link text-white mx-3">
        <img src='../imagen/usuario.png' width="50" className="my-4" alt="..." />
            {login.pacient?.nombre}
        </span>
        <button onClick={handlerLogout} className="btn btn-danger">
            Cerrar Sesion 
        </button>
     
      
    </div>
  </div>
</nav>

);
}