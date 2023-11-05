import { Header, Navbar } from "../../components";
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
      </div>
    </div>
  );
};
