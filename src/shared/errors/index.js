import { error_notify } from "../notify";

export const handler = (err) => {
  let status = err?.response?.status;
  let error_msg = err?.response?.data?.error;

  if (status == "404") {
    error_notify(error_msg);
  }

  if (status == "403") {
    if (error_msg.includes("eskirgan")) {
      error_notify(error_msg);
    }
  }

  if (status == "400") {
    if (error_msg == "Telefon raqam oldin ro'yxatdan o'tgan") {
      error_notify(error_msg);
    }
  }
};
