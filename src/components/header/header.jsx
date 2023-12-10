import { useEffect } from "react";
import "./header.css";

export const Header = ({ title, icon }) => {
  const handleShowSitebar = () => {
    let sitebar = document.querySelector(".Navbar");

    sitebar.classList.toggle("sticky-navbar");
  };

  return (
    <div className="Header">
      <h1 className="Header__title">
        {icon}
        {title || "No'malum"}
      </h1>
      <i
        className="fa-solid fa-bars bar-icon"
        onClick={() => handleShowSitebar()}
      ></i>
    </div>
  );
};
