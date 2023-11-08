import { Header, Navbar } from "../../components";
import { Build } from "../../layouts";
import "./order.css";

export const Order = () => {
  return (
    <div className="Default">
      <Navbar />
      <div className="Order">
        <Header
          icon={<i className="bx bx-box icon"></i>}
          title={"Buyurtma Berish"}
        />
        <div className="OrderMain page_build">
          <Build />
        </div>
      </div>
    </div>
  );
};
