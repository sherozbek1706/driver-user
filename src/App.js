import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import io from "socket.io-client";
import "./assets/main.css";
import { Routers } from "./shared/router";
import { api } from "./utils";

export const socket = io.connect(api);

function App() {
  return (
    <div className="App">
      <Routers />
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
