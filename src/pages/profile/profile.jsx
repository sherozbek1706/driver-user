import { Fragment, useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import "./profile.css";
import { handler, success_notify, user_axios } from "../../shared";
import { api } from "../../utils";
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

  return (
    <div className="Default">
      <Navbar />
      <div className="Profile">
        <Header
          icon={<i className="bx bx-user-circle icon"></i>}
          title={"Mening Sahifam"}
        />
        {/* <div className="Page__options">
              <button className="PageOptions__btn">
                <i class="fa-solid fa-pen icon"></i>Tahrirlash
              </button>
            </div>
            <div className="ProfileSide">
              <div className="ProfileSide__left">
                <div className="ProfileSideLeft__image">
                  <img src={api + data.image} alt={data.first_name} />
                </div>
                <h1 className="ProfileSideLeft__fullName">
                  {data.first_name} {"  "} {data.last_name}
                </h1>
              </div>
              <div className="ProfileSide__right">
                <h1 className="ProfileSideRight__title">Ma'lumotlaringiz</h1>
                <table className="ProfileSideRight__table">
                  <tr>
                    <td>ID</td>
                    <td>{data.id}</td>
                  </tr>
                  <tr>
                    <td>ISM</td>
                    <td>{data.first_name}</td>
                  </tr>
                  <tr>
                    <td>FAMILYA</td>
                    <td>{data.last_name}</td>
                  </tr>
                  <tr>
                    <td>USERNAME</td>
                    <td>{data.username}</td>
                  </tr>
                  <tr>
                    <td>TELEFON RAQAM</td>
                    <td>{data.phone_number}</td>
                  </tr>
                  <tr>
                    <td>PAROL</td>
                    <td>***********</td>
                  </tr>
                  <tr>
                    <td>BLOKLANGANMI ?</td>
                    <td>
                      {data.is_deleted ? "Bloklangan❌" : "Bloklanmagan ✅"}
                    </td>
                  </tr>
                </table>
              </div>
            </div> */}
      </div>
    </div>
  );
};
