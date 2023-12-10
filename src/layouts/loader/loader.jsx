import "./loader.css";
export const Loader = ({ additionClass }) => {
  return (
    <div
      className={`${
        additionClass == "Login" ? "login_loader" : "without"
      } Loader page_build`}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
