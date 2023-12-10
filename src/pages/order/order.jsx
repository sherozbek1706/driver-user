import { Fragment, useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { Build, Loader } from "../../layouts";
import "./order.css";
import { socket } from "../../App";
import { handler, user_axios } from "../../shared";
import { api } from "../../utils";

export const Order = () => {
  const [findDriver, setFindDriver] = useState({});
  const [section, setSection] = useState("1");
  const [dataId, setDataId] = useState("");
  const [addressArr, setAddressArr] = useState([]);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    checkUserMe();
    fetchDataRM();
    socket.on("buyurtma_qabul_qilindi", (msg) => {
      checkUserMe();
    });
    socket.on("haydovchi_manzilga_yetib_kelibdi", (msg) => {
      checkUserMe();
    });
    socket.on("haydovchi_yulovchi_bilan_yulga_chiqdi", (msg) => {
      checkUserMe();
    });
    socket.on("buyurtma_tuliq_bajarildi", (msg) => {
      if (msg.order_id == dataId) {
        setSection("6");
      }
    });
  }, [socket, loading]);

  const checkUserMe = async () => {
    try {
      const res = await user_axios.get("/users/check-me");

      if (res.status == 200) {
        setDataId(res.data.data.id);
        let data = res.data.data;
        if (data.status == "open") {
          setSection("2");
          setLoading(false);
        }
        if (data.status == "progress") {
          setSection("3");
          getDriver(data.id);
        }
        if (data.status == "wait") {
          setSection("4");
        }
        if (data.status == "restart") {
          setSection("5");
        }
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  };

  const getDriver = async (id) => {
    try {
      const res = await user_axios("/users/my-order/" + id);

      if (res.status == 200) {
        let data = res.data.data;
        setFindDriver(data);
        setLoading(false);
      }
    } catch (error) {
      handler(error);
      setLoading(false);
    }
  };

  const fetchDataRM = async () => {
    try {
      let res = await user_axios.get("/address");
      if (res.status == 200) {
        let data = res.data.data;
        setAddressArr(data);
        setAddress(data[0].id);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  };

  const handleChangeInp = (e, state) => {
    state(e.target.value);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const obj = {
      district,
      address_id: address,
    };
    createOrder(obj);
  };

  const createOrder = async (data) => {
    try {
      let res = await user_axios.post("/order", data);
      if (res.status == 201) {
        setLoading(true);
        socket.emit("buyurtma_qushish", { msg: "go" });
        setDistrict("");
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      let res = await user_axios.get("/users/cancel/order");

      if (res.status == 200) {
        setSection(1);
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  };

  return (
    <div className="Default">
      <Navbar />
      <div className="Order">
        <Header
          icon={<i className="bx bx-box icon"></i>}
          title={"Buyurtma Berish"}
        />
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {/* <div className={`OrderMain ${section === '1' || section === '2' ?  "Ordercenter" : ""}`}> */}
            <div className={`OrderMain Ordercenter`}>
              {/* <div className="OrderMain page_build"> */}
              {/* <Build />  */}
              <div className="OrderMainSection">
                <h3 className={`OrderMain__section OrderMain__section_active`}>
                  <i className="fa-solid fa-circle-plus icon"></i>
                </h3>
                <h3
                  className={`OrderMain__section ${
                    section >= "2" && "OrderMain__section_active"
                  }`}
                >
                  <i className="fa-solid fa-magnifying-glass icon"></i>
                </h3>
                <h3
                  className={`OrderMain__section ${
                    section >= "3" && "OrderMain__section_active"
                  }`}
                >
                  <i className="fa-solid fa-taxi icon"></i>
                </h3>
                <h3
                  className={`OrderMain__section ${
                    section >= "4" && "OrderMain__section_active"
                  }`}
                >
                  <i className="fa-solid fa-location-dot icon"></i>
                </h3>
                <h3
                  className={`OrderMain__section ${
                    section >= "5" && "OrderMain__section_active"
                  }`}
                >
                  <i className="fa-solid fa-route icon"></i>
                </h3>
                <h3
                  className={`OrderMain__section ${
                    section >= "6" && "OrderMain__section_active"
                  }`}
                >
                  <i className="fa-solid fa-flag-checkered icon"></i>
                </h3>
              </div>
              {section == "1" ? (
                <Fragment>
                  <form
                    className="OrderMainForm"
                    onSubmit={(e) => handleCreateOrder(e)}
                  >
                    <h1 className="OrderMainFormTitle">
                      Yangi Buyurtma berish!
                      <i className="fa-solid fa-circle-plus icon"></i>
                    </h1>
                    <p className="OrderMainFormParagraph">
                      Siz bu formadan haydovchi qayerga kelishini kiritasiz, u
                      kelgandan so'ng qayerga borishingizni aytishingiz mumkin.
                    </p>
                    <p className="OrderMainForm__title">
                      Yaqin atrofdagi joyni tanlang
                    </p>
                    <select
                      className="OrderMainFormOptions"
                      onChange={(e) => handleChangeInp(e, setAddress)}
                    >
                      {addressArr.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.address}
                        </option>
                      ))}
                    </select>
                    <p className="OrderMainForm__title">
                      Yaqin atrofdagi joyni kiriting...
                    </p>
                    <input
                      type="text"
                      className="OrderMainFormInput"
                      value={district}
                      onChange={(e) => handleChangeInp(e, setDistrict)}
                      placeholder={`Masalan: "Alisher Navoiy ko'chasi"`}
                    />
                    <button className="OrderMainFormBtn">
                      <i className="bx bx-box icon"></i> Buyurtma Berish
                    </button>
                  </form>
                </Fragment>
              ) : section == "2" ? (
                <Fragment>
                  <div className="OrderMainSearching">
                    <i className="fa-brands fa-searchengin SearchChangingForm"></i>
                    <h1 className="OrderMainSearching__title">
                      {" "}
                      Buyurtmangizga haydovchi qidirilmoqda...{" "}
                    </h1>
                    <button
                      className="OrderMainSearching__btn"
                      onClick={handleCancelOrder}
                    >
                      Bekor Qilish
                    </button>
                  </div>
                </Fragment>
              ) : section == "3" ? (
                <Fragment>
                  <div className="OrderMainDriver">
                    <h1 className="OrderMainDriver__title">
                      Haydovchi kelayabdi...
                    </h1>
                    <div className="OrderMainDriver__car">
                      <div className="OrderMainDriverCar__img">
                        <div className="OrderMainDriverCarImg__field">
                          <img
                            className="OrderMainDriverCarImgFieldImg"
                            src={api + findDriver.image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="OrderMainDriverCar__info">
                        <h2 className="OrderMainDriverCarInfo__fullname">
                          {findDriver.first_name} {findDriver.last_name},{" "}
                          {findDriver.age}
                        </h2>
                        <h2 className="OrderMainDriverCarInfo__text">
                          {findDriver.color}, {findDriver.model}
                        </h2>
                        <h2 className="OrderDriverCarInfo__number">
                          {findDriver.region_number}&nbsp;|&nbsp;
                          {findDriver.number}
                        </h2>
                      </div>
                    </div>
                    <div className="OrderMainDriver__order">
                      <div className="OrderMainDriverOrder__options">
                        <i className="fa-solid fa-location-dot icon"></i>
                        <p>
                          <span>Haydovchi kelayotgan manzil</span>:{" "}
                          {findDriver.address}, {findDriver.district}
                        </p>
                      </div>
                      <div className="OrderMainDriverOrder__options">
                        <i className="fa-solid fa-clock icon"></i>
                        <p>
                          <span>Tahminiy kelish vaqti</span>:{" "}
                          {findDriver.delay_time || 5} daqiqada keladi!
                        </p>
                      </div>
                    </div>
                    <div className="OrderDriverCall">
                      <a
                        href={`tel:` + findDriver.phone_number}
                        className="OrderDriverCall__btn"
                      >
                        <i className="fa-solid fa-square-phone icon"></i>
                        Telefon Qilish
                      </a>
                    </div>
                  </div>
                </Fragment>
              ) : section == "4" ? (
                <Fragment>
                  <div className="OrderMainFour">
                    <i className="fa-solid fa-location-dot icon"></i>
                    <h1>Haydovchi manzilga yetib keldi, sizni kutyabdi.</h1>
                  </div>
                </Fragment>
              ) : section == "5" ? (
                <Fragment>
                  <div className="OrderMainFive">
                    <i className="fa-solid fa-route icon"></i>
                    <h1>
                      Oq Yo'l. Safaringiz bexatar bo'lsin. Bizning xizmatdan
                      foydalanayotganingiz uchun raxmat!
                    </h1>
                  </div>
                </Fragment>
              ) : section == "6" ? (
                <Fragment>
                  <div className="OrderMainSix">
                    <i className="fa-solid fa-flag-checkered icon"></i>
                    <h1>
                      Manzilgan yetib keldingiz. Bizning xizmatdan
                      foydalanganingiz uchun raxmat.
                    </h1>
                    <button
                      className="OrderMainSixReturn"
                      onClick={() => setSection("1")}
                    >
                      Yangi Buyurtma berish
                    </button>
                  </div>
                </Fragment>
              ) : null}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
