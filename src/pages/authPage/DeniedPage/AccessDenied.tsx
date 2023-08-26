import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonCustomize from "../../../components/ButtonCustomize";
import "../../../assets/css/pages/authPage/page_access_denied.css";

type Props = {};
const imgAccessDenied = require("../../../assets/img/access_denied.png");

export default function AccessDenied({}: Props) {
  const navigate = useNavigate();
  return (
    <section className="page_access_denied">
      <div className="img_access_denied">
        <img src={imgAccessDenied} alt="" />
      </div>

      <h1>We are sorry ...</h1>
      <p>The page you are trying to access has restricted access</p>
      <p>Please refer to your system administrator</p>

      <ButtonCustomize
        text="Go Back"
        onClickBtn={() => {
          navigate(-1);
        }}
      />
    </section>
  );
}
