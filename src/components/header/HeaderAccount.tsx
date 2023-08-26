import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { DispatchType, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../redux/slices/userSlice";
import Avatar from "react-avatar";

type Props = {};

export default function HeaderAccount({}: Props) {
  const dispatch: DispatchType = useDispatch();
  const logoutUser = async () => {
    await dispatch(logoutUserThunk());
  };
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header__account">
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {currentUser.avatar ? (
            <img className="img__patient" src={currentUser.avatar} alt="" />
          ) : (
            <Avatar facebookId="100008343750912" size="40" round={true} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // MenuListProps={{
        //   "aria-labelledby": "basic-button",
        // }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="menu__account"
      >
        <Box className="header__menu-item">
          {currentUser.avatar ? (
            <img className="img__patient" src={currentUser.avatar} alt="" />
          ) : (
            <Avatar facebookId="100008343750912" size="44" round={true} />
          )}
          <Box className="infor__patient">
            <p className="name__patient">
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="role__user">Patient</p>
          </Box>
        </Box>
        <MenuItem className="menu__item" onClick={handleClose}>
          <NavLink className="nav__link" to="/patient/dashboard/profile">
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem className="menu__item" onClick={handleClose}>
          <NavLink
            className="nav__link"
            to="/patient/dashboard/history-appointment"
          >
            Appointment
          </NavLink>
        </MenuItem>
        <MenuItem className="menu__item" onClick={logoutUser}>
          <NavLink className="nav__link" to="/login">
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
