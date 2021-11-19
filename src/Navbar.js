import { NavLink } from 'react-router-dom';

function Navbar({ auth, onLogout }) {
  function onClickLogout(evt) {
    evt.preventDefault();
    onLogout();
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark position-sticky top-0 start-0 end-0 bg-dark bg-gradient">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#Home" onClick={(evt) => onClickLogin(evt)}>Issue Tracker</a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!auth && (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Login</NavLink>
              </li>
              )}
              {auth && (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" onClick={(evt) => onClickLogout(evt)}>Logout</NavLink>
              </li>
              )}
              <li className="nav-item">
                <NavLink to="/bug/list" className="nav-link">Bug List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/user/list" className="nav-link">User List</NavLink>
              </li>
            </ul>
            { auth && ( <span className="navbar-text">{auth.email}</span>)}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;