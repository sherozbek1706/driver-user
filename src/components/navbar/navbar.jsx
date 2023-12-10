import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
export const Navbar = () => {
  const { pathname } = useLocation();

  const handleCloseSitebar = () => {
    let sitebar = document.querySelector(".Navbar");

    sitebar.classList.remove("sticky-navbar");
  };

  return (
    <div className="Navbar">
      <h1 className="NavbarLogo">
        <i className="fa-brands fa-slack icon"></i>
        Driver <span>PLUS</span>
      </h1>
      <h1 className="NavbarLogo-media">
        <p> Driver PLUS</p>
        <i
          className="fa-solid fa-circle-xmark navbar-xmark-icon"
          onClick={handleCloseSitebar}
        ></i>
      </h1>
      <div className="NavbarNav">
        <Link
          to="/"
          className={`NavbarNav__link ${
            pathname == "/" ? "NavbarNavLinkActive" : ""
          }`}
        >
          <i className="bx bx-home-alt icon"></i>
          Bosh Sahifa
        </Link>
        <Link
          to="/order"
          className={`NavbarNav__link ${
            pathname == "/order" ? "NavbarNavLinkActive" : ""
          }`}
        >
          <i className="bx bx-box icon"></i>
          Buyurtma Berish
        </Link>
        <Link
          to="/order-history"
          className={`NavbarNav__link ${
            pathname == "/order-history" ? "NavbarNavLinkActive" : ""
          }`}
        >
          <i className="bx bx-archive-in icon"></i>
          Buyurtmalar Tarixi
        </Link>
        <Link
          to="/profile"
          className={`NavbarNav__link ${
            pathname == "/profile" ? "NavbarNavLinkActive" : ""
          }`}
        >
          <i className="bx bx-user-circle icon"></i>
          Mening Sahifam
        </Link>
      </div>
    </div>
  );
};
