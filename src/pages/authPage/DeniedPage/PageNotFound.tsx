import React from "react";
import ButtonCustomize from "../../../components/ButtonCustomize";
import { NavLink } from "react-router-dom";
import "../../../assets/css/pages/authPage/page_not_found.css";

type Props = {};

export default function PageNotFound({}: Props) {
  return (
    <section className="page_404">
      <h1>404</h1>
      <div className="img_404">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt=""
        />
      </div>

      <h3>Look like you're lost</h3>
      <p>The page you are looking for not available!</p>
      <NavLink to="/">
        <ButtonCustomize text="Go to Home" />
      </NavLink>
    </section>
  );
}
