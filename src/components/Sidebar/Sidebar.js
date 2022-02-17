import '../Sidebar/sidebar.css';
import {Link} from "react-router-dom";


const Sidebar = () => {
  const role = localStorage.getItem('role');
  return (
    <div className="sidebar">
      <header>
        <Link to="/home" className="text-bold">ALICARGO</Link>
      </header>

      <ul className="nav d-flex flex-column justify-content-around">
        <li>
          <Link to="/home/cargos">
            <i className="zmdi zmdi-view-dashboard"></i> Cargolar
          </Link>
        </li>
        <li>
          <Link to="/home/clients">
            <i className="zmdi zmdi-link"></i> Mijozlar
          </Link>
        </li>
        <li>
          <Link to="/home/flights" href="#!">
            <i className="zmdi zmdi-widgets"></i> Reyslar
          </Link>
        </li>
        {role === '100' ? (
          <li>
            <Link to="/home/employe">
              <i className="zmdi zmdi-info-outline"></i> Xodimlar
            </Link>
          </li>
        ): (
          <></>
        )}
        <li>
          <Link to="/home/warehouse">
            <i className="zmdi zmdi-info-outline"></i> Omborlar
          </Link>
        </li>
        {role === '100' ? (
          <li>
            <Link to="/home/airoport">
              <i className="zmdi zmdi-settings"></i> Aeroportlar
            </Link>
          </li>
        ):(<></>)}
        
      </ul>
    </div>
  );
};

export default Sidebar;