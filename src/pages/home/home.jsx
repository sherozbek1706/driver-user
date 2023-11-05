import "./home.css";
import { Header, Navbar } from "../../components";
export const Home = () => {
  return (
    <div className="Default">
      <Navbar />
      <div className="Home">
        <Header
          icon={<i className="bx bx-home-alt icon"></i>}
          title={"Bosh Sahifa"}
        />
      </div>
    </div>
  );
};
