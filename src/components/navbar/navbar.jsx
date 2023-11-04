import { Link, useLocation } from "react-router-dom";
import "./navbar.css";
export const Navbar = () => {
  const { pathname } = useLocation();
  return (
    <div className="Navbar">
      <h1 className="NavbarLogo">
        Driver <span>PLUS +</span>
      </h1>
      <div className="NavbarNav">
        <Link
          to="/"
          className={`NavbarNav__link ${
            pathname == "/" ? "NavbarNavLinkActive" : ""
          }`}
        >
          Bosh Sahifa
        </Link>
        <Link
          to="/order"
          className={`NavbarNav__link ${
            pathname == "/order" ? "NavbarNavLinkActive" : ""
          }`}
        >
          Buyurtma Berish
        </Link>
        <Link
          to="/order-history"
          className={`NavbarNav__link ${
            pathname == "/order-history" ? "NavbarNavLinkActive" : ""
          }`}
        >
          Buyurtmalar Tarixi
        </Link>
        <Link
          to="/profile"
          className={`NavbarNav__link ${
            pathname == "/profile" ? "NavbarNavLinkActive" : ""
          }`}
        >
          Mening Sahifam
        </Link>
      </div>
    </div>
  );
};
