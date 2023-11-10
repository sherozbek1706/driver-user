import { Fragment, useEffect, useState } from "react";
import { Header, Navbar } from "../../components";
import { Build, Loader } from "../../layouts";
import "./order.css";
import {handler, user_axios} from "../../shared"

export const Order = () => {
  const [section, setSection] = useState("1")
  const [addressArr, setAddressArr] = useState([])
  const [address, setAddress] = useState("")
  const [district, setDistrict] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserMe()
    fetchDataRM();
  }, [loading])


  const checkUserMe = async () => {
    try {
      const res = await user_axios.get("/users/check-me");
      if(res.status == 200){
        let data = res.data.data;
        if(data.status == "open"){
          console.log("ix" , data);
          setSection("2");
          setLoading(false);
        }if(data.status == "progress"){
          console.log(data);
          setSection("3");
          getDriver(data.id)
        }
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  }

  const getDriver = async (id) => {
    try {
      const res = await user_axios("/users/my-order/" + id);

      if(res.status == 200){
        let data = res.data.data;
        console.log(data);
        setLoading(false)
      }
    } catch (error) {
      handler(error)
      setLoading(false)
    }
  }

  const fetchDataRM = async () => {
    try {
      let res = await user_axios.get("/address");
      if(res.status == 200){
        let data = res.data.data;
        setAddressArr(data)
        setAddress(data[0].id)
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  }

  const handleChangeInp = (e, state) => {
    state(e.target.value)
    
  }

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const obj = {
      district,
      address_id: address
    };
    createOrder(obj)
  }

  const createOrder = async (data) => {
    try {
      let res = await user_axios.post("/order", data);
      if(res.status == 201){
        setLoading(true);
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  }

  return (
    <div className="Default">
      <Navbar />
      <div className="Order">
        <Header
          icon={<i className="bx bx-box icon"></i>}
          title={"Buyurtma Berish"}
        />
        {loading ? <Loader /> : (
          <Fragment>
            {/* <div className={`OrderMain ${section === '1' || section === '2' ?  "Ordercenter" : ""}`}> */}
            <div className={`OrderMain Ordercenter`}>
              {/* <div className="OrderMain page_build"> */}
                {/* <Build />  */}
                <h3 className="OrderMain__section">{section}</h3>
                {section == '1' ? <form className="OrderMainForm" onSubmit={(e) => handleCreateOrder(e)}>
                  <h1 className="OrderMainFormTitle">
                    Yangi Buyurtma berish!
                    <i className="fa-solid fa-circle-plus icon"></i>
                  </h1>
                  <p className="OrderMainFormParagraph">Siz bu formadan haydovchi qayerga kelishini kiritasiz, u kelgandan so'ng qayerga borishingizni aytishingiz mumkin.</p>
                  <p className="OrderMainForm__title">Yaqin atrofdagi joyni tanlang</p>
                  <select className="OrderMainFormOptions" onChange={(e) => handleChangeInp(e, setAddress)} >
                    {addressArr.map((item) => (
                      <option key={item.id} value={item.id}>{item.address}</option>
                    ))}
                  </select>
                  <p className="OrderMainForm__title">Yaqin atrofdagi joyni kiriting...</p>
                  <input type="text" className="OrderMainFormInput" value={district} onChange={(e) => handleChangeInp(e, setDistrict)} placeholder={`Masalan: "Alisher Navoiy ko'chasi"`} />
                  <button className="OrderMainFormBtn"><i className="bx bx-box icon"></i> Buyurtma Berish</button>
                </form> : section == '2' ? <Fragment>
                      <div className="OrderMainSearching">
                        <i class="fa-brands fa-searchengin SearchChangingForm"></i>
                        <h1 className="OrderMainSearching__title"> Buyurtmangizga haydovchi qidirilmoqda... </h1>
                        <button className="OrderMainSearching__btn" >Bekor Qilish</button>
                      </div>
                  </Fragment>: null}
              </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
