import React from "react";
import "../../../assets/css/pages/authPage/page_request_verify_email.css";

type Props = {};
const emailImg = require("../../../assets/img/email.jpg");

export default function PageRequestVerifyEmail({}: Props) {
  return (
    <div className="verify__div--container">
      <img className="verify__img--email" src={emailImg} alt="" />
      <h1 className="verify__h1">Please check your email to verify account!</h1>
    </div>
  );
}
