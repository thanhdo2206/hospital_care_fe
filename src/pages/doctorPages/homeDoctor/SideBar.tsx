import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import * as React from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { DispatchType, RootState } from "../../../redux/configStore";
import { logoutUserThunk } from "../../../redux/slices/userSlice";

type Props = {};

const arrSelectSideBar = [
  {
    url: "/doctor/appointment",
    name: "Appointment",
    icon: <CalendarTodayIcon className="side__bar-icon" />,
  },

  {
    url: "/doctor/schedule-timing",
    name: "Schedule Timing",
    icon: <AccessTimeIcon className="side__bar-icon" />,
  },
];

const logo = require("../../../assets/img/logo-hospital-care.png");

export default function SideBar({}: Props) {
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const handleLogoutUser = async () => {
    await dispatch(logoutUserThunk());
    navigate("/login");
  };

  return (
    <div className="conatainer__side__bar">
      <div className="header__side__bar">
        <img src={logo} alt="" />
        <span>Hospital Care</span>
      </div>
      <div className="profile__info-widget">
        <div className="img__doctor">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt="" />
          ) : (
            <Avatar facebookId="100008343750912" size="120" />
          )}
        </div>
        <h3 className="name__doctor">
          Dr. {currentUser.firstName} {currentUser.lastName}
        </h3>
      </div>
      <div className="list__side__bar">
        <ul>
          {arrSelectSideBar.map((item, index) => {
            return (
              <li key={index}>
                <NavLink className="nav__link" to={item.url}>
                  {item.icon}
                  {item.name}
                </NavLink>
              </li>
            );
          })}

          <li className="logout__container" onClick={handleLogoutUser}>
            <InboxIcon className="side__bar-icon" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
