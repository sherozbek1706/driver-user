import { Fragment, useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import "./profile.css";
import { handler, info_notify, success_notify, user_axios } from "../../shared";
import { api } from "../../utils";
import { Build } from "../../layouts";
export const Profile = () => {
  const [data, setData] = useState([]);
  const [section, setSection] = useState("1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await user_axios("/users/show/me");
      if (res.status == 200) {
        setData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      handler(error);
    }
  };

  const logoutFunc = () => {
    info_notify("Tizimdan chiqdingiz.");
    localStorage.clear();
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  };

  return (
    <div className="Default">
      <Navbar />
      <div className="Profile">
        <Header
          icon={<i className="bx bx-user-circle icon"></i>}
          title={"Mening Sahifam"}
        />
        <div className="ProfileMain">
          <div className="ProfileMainHeader">
            <div className="ProfileMainHeaderImage">
              <img src={api + data.image} alt="" />
            </div>
          </div>
          <div className="ProfileMainName">
            <h1>
              {data.first_name} {data.last_name}
            </h1>
          </div>
          <div className="LogOutSection" onClick={logoutFunc}>
            <button>Tizimdan Chiqish</button>
          </div>
        </div>
      </div>
    </div>
  );
};
