import { Header, Navbar } from "../../components";
import "./order-history.css";

export const OrderHistory = () => {
  return (
    <div className="Default">
      <Navbar />
      <div className="OrderHistory">
        <Header
          icon={<i className="bx bx-archive-in icon"></i>}
          title={"Buyurtmalar Tarixi"}
        />
      </div>
    </div>
  );
};
