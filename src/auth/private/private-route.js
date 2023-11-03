import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const token = localStorage.getItem("v1_u_t");
      const decode = jwtDecode(token);

      navigate("/");
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};
