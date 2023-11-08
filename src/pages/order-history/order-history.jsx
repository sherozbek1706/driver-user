import { Header, Navbar } from "../../components";
import { Build } from "../../layouts";
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
        <div className="OrderHistoryMain page_build">
          <Build />
        </div>
      </div>
    </div>
  );
};
