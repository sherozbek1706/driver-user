import "./header.css";

export const Header = ({ title, icon }) => {
  return (
    <div className="Header">
      <h1 className="Header__title">
        {icon}
        {title || "No'malum"}
      </h1>
    </div>
  );
};
