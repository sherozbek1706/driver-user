import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Protect = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem("v1_u_t");
      const decoded = jwtDecode(token);
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};
