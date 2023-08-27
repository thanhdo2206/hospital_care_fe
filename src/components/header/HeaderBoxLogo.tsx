import { Link } from "react-router-dom";

const logo = require("../../assets/img/logo-hospital-care.png");

function HeaderBoxLogo() {
  return (
    <Link to="/home" className="header__box--logo">
      <img className="header__img--logo" src={logo} alt="" />
      <p className="header__title--slogan">Hospital Care</p>
    </Link>
  );
}

export default HeaderBoxLogo;
