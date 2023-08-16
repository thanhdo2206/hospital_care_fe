import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { logoutUserThunk } from "../../redux/slices/userSlice";
import { Box } from "@mui/material";
import HeaderBoxLogo from "./HeaderBoxLogo";
import "../../assets/css/components/header.css";
import HeaderNavBar from "./HeaderNavBar";
import HeaderAccount from "./HeaderAccount";
import { AUTH } from "../../constants/constants";
import { getStorage } from "../../utils/localStorage";
import ButtonCustomize from "../ButtonCustomize";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type Props = {};

export default function Header({}: Props) {
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const isAuth = getStorage(AUTH);

  return (
    <Box className="header__container">
      <HeaderBoxLogo />
      <Box className="header__nav__avatar">
        <HeaderNavBar />
        {isAuth && currentUser ? (
          <HeaderAccount />
        ) : (
          <Box className="header__container__button">
            <NavLink to="/sign-up">
              <ButtonCustomize
                className="button__auth button_register"
                text="Register"
                icon={<PersonOutlineOutlinedIcon />}
              />
            </NavLink>

            <NavLink to="/login">
              <ButtonCustomize
                className="button__auth button_login"
                text="Login"
                icon={<LockOutlinedIcon />}
              />
            </NavLink>
          </Box>
        )}
      </Box>
    </Box>
  );
}
