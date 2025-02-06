import { Link } from "react-router-dom";
import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/drivers">Drivers</Link>
          </li>
          <li className="navbar-item">
            <Link to="/vehicles">Vehicles</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
