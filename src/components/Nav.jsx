import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" to="/home" aria-label="The Book Nook home">
          <span className="site-brand-mark" aria-hidden="true">B</span>
          <span className="site-brand-copy">
            <strong>The Book Nook</strong>
            <small>Your little bookshop</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/home" className={({ isActive }) => isActive ? "site-nav-link active" : "site-nav-link"}>
            Home
          </NavLink>
          <NavLink to="/" end className={({ isActive }) => isActive ? "site-nav-link active" : "site-nav-link"}>
            Browse books
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "site-nav-link active" : "site-nav-link"}>
            Add a book
          </NavLink>
          <NavLink to="/card-form-lesson" className={({ isActive }) => isActive ? "site-nav-link active" : "site-nav-link"}>
            Product form
          </NavLink>
          <NavLink to="/saved-books" className={({ isActive }) => isActive ? "site-nav-link active" : "site-nav-link"}>
            Saved books
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
