import "./home.css";
import { Header, Navbar } from "../../components";
import { Build } from "../../layouts";
export const Home = () => {
  return (
    <div className="Default">
      <Navbar />
      <div className="Home">
        <Header
          icon={<i className="bx bx-home-alt icon"></i>}
          title={"Bosh Sahifa"}
        />
        <div className="HomeMain page_build">
          <Build />
        </div>
      </div>
    </div>
  );
};
