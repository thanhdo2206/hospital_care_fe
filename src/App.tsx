import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/configStore";
import { Provider } from "react-redux";
import "./assets/css/base/root.css";
import "./reset_css.css";
import SignUp from "./pages/authPage/SignUp/SignUp";
import Login from "./pages/authPage/Login/Login";
import PageVerifyEmail from "./pages/authPage/VerifyEmail/PageVerifyEmail";
import PageRequestVerifyEmail from "./pages/authPage/VerifyEmail/PageRequestVerifyEmail";
import Home from "./templates/Home";
import PrivateRoute from "./routes/PrivateRoute";
import { ROLE } from "./constants/enums";
import DoctorPage from "./pages/doctorPage/DoctorPage";
import PatientPage from "./pages/patientPage/PatientPage";
import Booking from "./pages/patientPage/Booking";
import Profile from "./pages/patientPage/Profile";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="home" element={<Home />}></Route>

          <Route path="sign-up" element={<SignUp />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route
            path="request-verify-mail"
            element={<PageRequestVerifyEmail />}
          ></Route>

          <Route
            path="verify-email/:emailToken/:userId"
            element={<PageVerifyEmail />}
          ></Route>

          <Route
            path="doctor"
            element={
              <PrivateRoute roles={[ROLE.DOCTOR]}>
                <DoctorPage />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="patient"
            element={
              <PrivateRoute roles={[ROLE.PATIENT]}>
                <PatientPage />
              </PrivateRoute>
            }
          >
            <Route path="booking" element={<Booking />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
