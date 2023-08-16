import React from "react";

import BreadCrumbs from "./BreadCrumbs";

type Props = {};

export default function NavBar({}: Props) {
  return (
    <nav className="container__nav">
      <div className="container__nav-content">
        <div className="nav__left">
          <BreadCrumbs />
        </div>
        {/* <div className='nav__right'>
          <AppointmentNotification />
        </div> */}
      </div>
    </nav>
  );
}
