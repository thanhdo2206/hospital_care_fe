import React from "react";
import "../assets/css/templates/form_login_register.css";

type Props = {
  formInput?: JSX.Element;
  nameForm: string;
  footerElement: JSX.Element;
  textErrorResponse?: string;
};
const logo = require("../assets/img/logo-hospital-care.png");

export default function FormLoginRegister(props: Props) {
  const { formInput, nameForm, footerElement, textErrorResponse } = props;
  return (
    <div className="container__login__register">
      <div className="container_form">
        <div className="header__form">
          <img src={logo} alt="" className="img__logo" />
          <p>{nameForm}</p>
        </div>
        <p className="error__response">{textErrorResponse}</p>
        {formInput}
        <div className="footer__form">{footerElement}</div>
      </div>
    </div>
  );
}
