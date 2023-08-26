import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ButtonCustomize from "../../../components/ButtonCustomize";
import "../../../assets/css/pages/authPage/page_verify_email.css";
import { verifyEmailTokenService } from "../../../services/authService";

const imgVerifyEmailSuccess = require("../../../assets/img/verify_email_success.png");
const imgVerifyEmailFail = require("../../../assets/img/verify_failed.png");

type Props = {};

export default function PageVerifyEmail({}: Props) {
  const params = useParams();
  const { emailToken, userId } = params;
  const [responseApi, setResponseApi] = useState({
    statusCode: 0,
    message: "",
  });

  useEffect(() => {
    const verifyEmailApi = async () => {
      const response = await verifyEmailTokenService(
        emailToken as string,
        userId as string
      );

      setResponseApi({
        statusCode: response.statusCode,
        message: response.message,
      });
    };
    verifyEmailApi();
  }, [emailToken, userId]);

  const renderComponent = () => {
    if (responseApi.statusCode === 200) {
      return (
        <div className="verify__success">
          <img src={imgVerifyEmailSuccess} alt="" />
          <p>Your email has been verified. Your account is now active.</p>
          <p>Please use the link below to login to your account.</p>
          <NavLink to="/login">
            <ButtonCustomize text="Login to your account"></ButtonCustomize>
          </NavLink>
        </div>
      );
    }

    if (responseApi.statusCode === 401) {
      return (
        <div className="verify__fail">
          <img src={imgVerifyEmailFail} alt="" />
          <h1>Error</h1>
          <p>{responseApi.message}</p>
        </div>
      );
    }

    return <></>;
  };

  return <div className="container__verify__email">{renderComponent()}</div>;
}
