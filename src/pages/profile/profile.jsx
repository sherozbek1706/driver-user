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
        console.log(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      handler(error);
    }
  };


  const logoutFunc = () => {
    info_notify("Tizimdan chiqdingiz.")
    localStorage.clear();
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  }

  return (
    <div className="Default">
      <Navbar />
      <div className="Profile">
        <Header
          icon={<i className="bx bx-user-circle icon"></i>}
          title={"Mening Sahifam"}
        />
        <div className="ProfileMain">
        {/* <div className="ProfileMain page_build"> */}
          {/* <Build /> */}
          <div className="ProfileBanner">
            <h1 className="ProfileBanner__title">{data.first_name} {data.last_name}</h1>
            <div className="profileBannerImage">
              <img src={api + data.image} alt="" />
            </div>
          </div>
          <div className="ProfileInfo">
            <div className="ProfileInfo__options">
            <button className="ProfileInfoBtns"><i className="fa-solid fa-key icon"></i>Parol Almashtirish</button>
              <button className="ProfileInfoBtns" ><i className="fa-solid fa-pen icon"></i>Tahrirlash</button>
            </div>
            <div className="ProfileInfo__options">
              <button className="ProfileInfoBtns"  onClick={logoutFunc}><i className="fa-solid fa-right-from-bracket icon"></i>Tizimdan chiqish</button>
            </div>
          </div>
            <div className="ProfileInfos">
              <h2 className="ProfileInfos__fullname">{data.first_name} {data.last_name} 
              <a href={`tel:${data.phone_number}`} className="ProfileInfos__number">{data.phone_number}</a></h2>
              <h2 className="ProfileInfos__username">@{data.username}</h2>
            </div>
        </div>
      </div>
    </div>
  );
};
