import React from "react";
import { NavLink } from "react-router-dom";
import { arrNavigations } from "../../utils/headerSetting";

type Props = {};

export default function HeaderNavBar({}: Props) {
  const renderNavigations = () => {
    return arrNavigations.map((navItem, index) => {
      return (
        <li className="nav__item" key={index}>
          <NavLink className="nav__link" to={navItem.link}>
            <span>{navItem.nameNavItem}</span>
          </NavLink>
        </li>
      );
    });
  };
  return (
    <>
      <ul className="header__nav__container">{renderNavigations()}</ul>
    </>
  );
}
