import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd",fontSize:"18px", fontFamily:"Poppins"}}>
      <div className="container-fluid px-lg-5">
        <a href="/" className="navbar-brand">TubaTrims</a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse9">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ps-4" id="navbarCollapse9">
          <div className="navbar-nav">
            <NavLink to='/' className="nav-item nav-link">Home</NavLink>
            <NavLink to='/category' className="nav-item nav-link">Category</NavLink>
            <NavLink to='/products/blet01' className="nav-item nav-link">Product</NavLink>
            <NavLink to='/add' className="nav-item nav-link">Add</NavLink>
          </div>
          <form className="d-flex ms-auto">
            <input type="text" className="form-control me-sm-2" placeholder="Search" id='search'/>
            <button type="submit" className="btn btn-outline-info">Search</button>
          </form>
        </div>
      </div>        
    </nav>
  );
};

export default NavBar;
