import { Fragment, useState } from "react";
import "./login.css";
import {
  error_notify,
  handler,
  success_notify,
  user_axios,
  warning_notify,
} from "../../../shared";
import { Loader } from "../../../layouts";
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [number, setNumber] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [degree, setDegree] = useState("1");
  const [full, setFull] = useState(false);

  const handleChangeSecretCode = (e) => {
    let regex = /^\d+$/;
    let value = e.target.value.slice(0, 6);
    if (regex.test(value) || value == "") {
      if (value.length <= 6) {
        setSecretCode(value);
      }
    }
    if (value.length == 6) {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const handleChangeFirstname = (e) => {
    var regex = /^[a-zA-Z]+$/;
    let value = e.target.value;
    if (
      (!value.includes(" ") && value.length < 22 && regex.test(value)) ||
      value == ""
    ) {
      setFirst_name(value);
      if (value && last_name) {
        setFull(true);
      } else {
        setFull(false);
      }
    }
  };

  const handleChangeLastname = (e) => {
    var regex = /^[a-zA-Z]+$/;
    let value = e.target.value;
    if (
      (!value.includes(" ") && value.length < 22 && regex.test(value)) ||
      value == ""
    ) {
      setLast_name(value);
      if (value && first_name) {
        setFull(true);
      } else {
        setFull(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let extName = file.name.split(".").slice(-1)[0];
      if (extName == "jpg" || extName == "png" || extName == "jpeg") {
        setImageFile(file);

        if (last_name && first_name) {
          setFull(true);
        } else {
          setFull(false);
        }

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        warning_notify("Boshqa rasm tanlang!");
        setImagePreview("");
        setImageFile("");
      }
    }
  };

  const handleChangePassword = async (e, states) => {
    let value = e.target.value;
    if ((!value.includes(" ") && value.length < 32) || value === "") {
      states(value);
    }
    if (value == confirmPassword && value !== "") {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const changePassword = async (e, states) => {
    let value = e.target.value;
    if ((!value.includes(" ") && value.length < 32) || value === "") {
      states(value);
    }

    if (value !== "") {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const handleChangeConfirmPassword = async (e, states) => {
    let value = e.target.value;
    if ((!value.includes(" ") && value.length < 32) || value === "") {
      states(value);
    }
    if (value == password && value !== "") {
      setFull(true);
    } else {
      setFull(false);
    }
  };

  const handleCheckCode = async () => {
    try {
      const res = await user_axios.post("/users/check-code", {
        code: secretCode,
      });

      let status = res.status;

      if (status == 200) {
        if (res.data.data.already_exist) {
          setDegree("4");
        } else {
          setDegree("2");
        }
        setNumber(res.data.data.number);
        setFull(false);
        success_notify("Kod muvaffaqiyatli kiritildi!");
      }
    } catch (error) {
      handler(error);
    }
  };

  const handleRegister = async () => {
    let username = `user${Math.floor(+Date.now() / 5.89)}`;

    const formData = new FormData();

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("image", imageFile);
    formData.append("phone_number", number);
    formData.append("password", password);
    formData.append("username", username);

    userCreate(formData);

    setLoading(true);
  };

  const userCreate = async (data) => {
    try {
      const res = await user_axios.post("/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status == 201) {
        let token = res.data.data.token;
        localStorage.setItem("v1_u_t", token);
        success_notify("Ro'yxatdan o'tdingiz 🎉🎉");
        setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      }
    } catch (error) {
      handler(error);
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      let data = { phone_number: number, password };
      const res = await user_axios.post("/users/login", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status == 200) {
        let token = res.data.data.token;

        localStorage.setItem("v1_u_t", token);
        success_notify("Login qildingiz 🎉🎉");
        setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      }
    } catch (error) {
      let msg = error.response.data.error;
      if (msg) {
        error_notify(msg);
      }
      handler(error);
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!full) {
      return;
    }

    if (degree == 1) {
      handleCheckCode();
    }

    if (degree == 2) {
      if (!imageFile) {
        return warning_notify("Rasm tanlashingiz kerak!");
      }
      setDegree("3");
      setFull(false);
    }

    if (degree == 3) {
      handleRegister();
    }

    if (degree == 4) {
      handleLogin();
    }
  };

  return (
    <div className="Login">
      <form className="Login__form" onSubmit={(e) => handleForm(e)}>
        {loading ? (
          <Loader additionClass={"Login"} />
        ) : (
          <Fragment>
            <h1 className="LoginForm__title">
              {degree != "4" ? "Ro'yxatdan o'tish" : "Kirish"}
              <i className="fa-solid fa-arrow-right icon"></i>
            </h1>
            {degree == 1 ? (
              <Fragment>
                <h2 className="LoginForm__description">
                  Kirish uchun maxfiy kodni bizning{" "}
                  <a
                    href="https://t.me/haydovchilarga_guvohnomabot"
                    target="_blank"
                    className="LoginForm__telegramlink"
                  >
                    @haydovchibot
                  </a>{" "}
                  telegram botimizga kirgan holda olishingiz mumkin. ( Kod faqat
                  1 daqiqa amal qiladi! )
                </h2>
                <div className="LoginForm__field">
                  <p className="LoginFormField__title">KOD</p>
                  <div className="LoginFormField__secret">
                    <input
                      type="text"
                      name="secret-code"
                      value={secretCode}
                      onChange={(e) => handleChangeSecretCode(e)}
                      className="LoginFormField__input"
                      placeholder="Maxfiy Kod"
                    />
                    <button
                      className={`LoginFormFieldSecret__btn ${
                        full ? "full" : ""
                      }`}
                    >
                      Kirish
                    </button>
                  </div>
                </div>
              </Fragment>
            ) : degree == 2 ? (
              <Fragment>
                <h2 className="LoginForm__description">
                  Assalomu alaykum, siz saytdan ro'yxatdan o'tishingiz kerak !
                  Sababi bu raqam ( {number} ) oldin ro'yxatdan o'tmagan!
                </h2>
                <div className="LoginForm__field">
                  <div className="LoginFormField__image">
                    <div className="LoginFormFieldImage__content">
                      <label htmlFor="selectImage" className="selectImageLabel">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Selected"
                            className="LoginFormField__image-preview"
                          />
                        ) : (
                          <i className="fa-regular fa-circle-user icon"></i>
                        )}
                      </label>
                      <input
                        id="selectImage"
                        name="selectImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="LoginFormField__inputimage"
                      />
                    </div>
                    <p className="LoginFormField__title">
                      {imageFile
                        ? imageFile.name
                        : "Profile uchun rasm tanlang"}
                    </p>
                  </div>
                  <p className="LoginFormField__title">Ismingizni kiriting</p>
                  <input
                    type="text"
                    // name="secret-code"
                    value={first_name}
                    onChange={(e) => handleChangeFirstname(e)}
                    className="LoginFormField__input"
                    placeholder="Ism"
                  />
                  <p className="LoginFormField__title">
                    Familyangizni kiriting
                  </p>
                  <input
                    type="text"
                    // name="secret-code"
                    value={last_name}
                    onChange={(e) => handleChangeLastname(e)}
                    className="LoginFormField__input"
                    placeholder="Familya"
                  />
                  <button
                    className={`LoginFormField__btn ${full ? "full" : ""}`}
                  >
                    Davom etish...
                  </button>
                </div>
              </Fragment>
            ) : degree == 3 ? (
              <Fragment>
                <h2 className="LoginForm__description">
                  Yaxshi, endi siz sahifangizga kirish uchun parol qo'yishingiz
                  kerak bo'ladi!
                </h2>
                <div className="LoginForm__field">
                  <p className="LoginFormField__title">Parolni kiriting</p>
                  <input
                    type="password"
                    // name="secret-code"
                    value={password}
                    onChange={(e) => handleChangePassword(e, setPassword)}
                    className="LoginFormField__input"
                    placeholder="Parol"
                  />
                  <p className="LoginFormField__title">
                    Tasdiqlash parolini kiriting
                  </p>
                  <input
                    type="password"
                    // name="secret-code"
                    value={confirmPassword}
                    onChange={(e) =>
                      handleChangeConfirmPassword(e, setConfirmPassword)
                    }
                    className="LoginFormField__input"
                    placeholder="Tasdiqlash paroli"
                  />
                  <button
                    className={`LoginFormField__btn ${full ? "full" : ""}`}
                  >
                    Ro'yxatdan o'tish
                  </button>
                </div>
              </Fragment>
            ) : degree == 4 ? (
              <Fragment>
                <h2 className="LoginForm__description">
                  Bizning tizimda sizning ma'lumotlaringiz topildi, shu sababli
                  parolni kiritib tizimga kirishingiz mumkin!
                </h2>
                <div className="LoginForm__field">
                  <p className="LoginFormField__title">Telefon Raqam</p>
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => handleChangePassword(e, setPassword)}
                    className="LoginFormField__input"
                    placeholder="Telefon raqam"
                    disabled={true}
                  />
                  <p className="LoginFormField__title">Parol</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => changePassword(e, setPassword)}
                    className="LoginFormField__input"
                    placeholder="Parolni kiriting"
                  />
                  <button
                    className={`LoginFormField__btn ${full ? "full" : ""}`}
                  >
                    Kirish
                  </button>
                </div>
              </Fragment>
            ) : null}
          </Fragment>
        )}
      </form>
    </div>
  );
};
