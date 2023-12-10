import { Header, Navbar } from "../../components";
import { Build, Empty, Loader } from "../../layouts";
import "./order-history.css";
import { handler } from "../../shared/";
import { user_axios } from "../../shared/";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils";
export const OrderHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let res = await user_axios.get("/users/history");
      if (res.status == 200) {
        setData(res.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      handler(error);
    }
  };

  return (
    <div className="Default">
      <Navbar />
      <div className="OrderHistory">
        <Header
          icon={<i className="bx bx-archive-in icon"></i>}
          title={"Buyurtmalar Tarixi"}
        />
        <div className="OrderHistoryMain ">
          {/* <div className="OrderHistoryMain page_build"> */}
          {/* <Build /> */}
          {loading ? (
            <Loader />
          ) : (
            <div className="OrderLists">
              {data?.length == 0 ? (
                <Empty />
              ) : (
                data.map((item) => (
                  <div className="OrderItem" key={item.id}>
                    {/* <h1></h1>
                  <h2>{item.district}</h2> */}
                    <div className="OrderItem__head">
                      <p className="OrderItemHead__idx">#{item.id}</p>
                      <p className="OrderItemHead__status">{item.status}</p>
                    </div>
                    <div className="OrderItem__body">
                      <h1 className="OrderItem__address">{item.address}</h1>
                      <h2 className="OrderItem__district">{item.district}</h2>
                      <p className="OrderItem__date">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
