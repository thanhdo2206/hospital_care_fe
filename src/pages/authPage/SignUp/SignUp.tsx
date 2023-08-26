import React, { useRef, useState } from "react";
import "../../../assets/css/pages/authPage/sign_up.css";
import TextField from "@mui/material/TextField";
import {
  CHECK_EMAIL_EMPTY,
  CHECK_EMAIL_MATCH_REGEX,
  CHECK_FIRST_NAME_EMPTY,
  CHECK_LAST_NAME_EMPTY,
  CHECK_NAME_MATCH_REGEX,
  CHECK_PASSWORD_CONFIRM_EMPTY,
  CHECK_PASSWORD_CONFIRM_MATCH_PASSWORD,
  CHECK_PASSWORD_EMPTY,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX,
} from "../../../utils/validateForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IPatientRegister } from "../../../interface/UserInterface";
import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX_VN } from "../../../utils/regex";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import FormLoginRegister from "../../../templates/FormLoginRegister";
import { signUpService } from "../../../services/userService";
import { ProgressListener } from "../../../components/Progress";
const flagVN = require("../../../assets/img/vietnam_flag.png");

type Props = {};

export default function SignUp(props: Props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const [textErrorResponse, setTextErrorResponse] = useState<string>("");

  const handleClickShowPassword = (checkFormPass: number) => {
    if (checkFormPass === 1) {
      setShowPassword({
        ...showPassword,
        password: !showPassword.password,
      });
      return;
    }

    setShowPassword({
      ...showPassword,
      passwordConfirmation: !showPassword.passwordConfirmation,
    });
  };

  const registerApi = async (dataRegister: IPatientRegister) => {
    const response = await signUpService({ ...dataRegister, role: "PATIENT" });
    ProgressListener.emit("stop");

    if (response.statusCode && response.statusCode > 400) {
      setTextErrorResponse(response.message);
      return;
    }
    navigate("/request-verify-mail");
  };

  const formik = useFormik<IPatientRegister>({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string()
        .required(CHECK_FIRST_NAME_EMPTY)
        .matches(NAME_REGEX, CHECK_NAME_MATCH_REGEX),
      lastName: Yup.string()
        .required(CHECK_LAST_NAME_EMPTY)
        .matches(NAME_REGEX, CHECK_NAME_MATCH_REGEX),
      email: Yup.string()
        .required(CHECK_EMAIL_EMPTY)
        .matches(EMAIL_REGEX, CHECK_EMAIL_MATCH_REGEX),
      phoneNumber: Yup.string()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      password: Yup.string().required(CHECK_PASSWORD_EMPTY),
      passwordConfirmation: Yup.string()
        .required(CHECK_PASSWORD_CONFIRM_EMPTY)
        .oneOf([Yup.ref("password")], CHECK_PASSWORD_CONFIRM_MATCH_PASSWORD),
    }),

    onSubmit: (values) => {
      ProgressListener.emit("start");

      registerApi(values);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const formRegister: JSX.Element = (
    <form action="" onSubmit={handleSubmit} className="form__input">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} md={6}>
          <div className="container__input">
            <label className="label__input">
              First Name <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field"
              onChange={handleChange}
              placeholder="e.g. Do Van"
              error={errors.firstName ? true : false}
              helperText={errors.firstName}
              name="firstName"
              value={values.firstName}
            />
          </div>
        </Grid>

        <Grid item xs={12} lg={6} md={6}>
          <div className="container__input">
            <label className="label__input">
              Last Name <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field"
              onChange={handleChange}
              placeholder="e.g. Duc Thanh"
              error={errors.lastName ? true : false}
              helperText={errors.lastName}
              name="lastName"
              value={values.lastName}
            />
          </div>
        </Grid>

        <Grid item xs={12} lg={6} md={6}>
          <div className="container__input">
            <label className="label__input">
              Email <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field"
              onChange={handleChange}
              placeholder="e.g. abc@gmail.com"
              error={errors.email ? true : false}
              helperText={errors.email}
              name="email"
              value={values.email}
            />
          </div>
        </Grid>

        <Grid item xs={12} lg={6} md={6}>
          <div className="container__input">
            <label className="label__input">
              Phone Number <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field phone__input"
              onChange={handleChange}
              placeholder="e.g. 0968212841"
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              name="phoneNumber"
              value={values.phoneNumber}
              type="text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <img className="img__flag" src={flagVN} alt="" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} lg={12} md={12}>
          <div className="container__input">
            <label className="label__input">
              Password <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field password__input"
              onChange={handleChange}
              error={errors.password ? true : false}
              helperText={errors.password}
              name="password"
              value={values.password}
              type={showPassword.password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        handleClickShowPassword(1);
                      }}
                      edge="end"
                    >
                      {showPassword.password ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>

        <Grid item xs={12} lg={12} md={12}>
          <div className="container__input">
            <label className="label__input">
              Confirm Password <span className="sign__required">*</span>
            </label>
            <TextField
              fullWidth
              className="text__field password__input"
              onChange={handleChange}
              error={errors.passwordConfirmation ? true : false}
              helperText={errors.passwordConfirmation}
              name="passwordConfirmation"
              value={values.passwordConfirmation}
              type={showPassword.passwordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        handleClickShowPassword(2);
                      }}
                      edge="end"
                    >
                      {showPassword.passwordConfirmation ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>
      </Grid>

      <button type="submit" className="btn__login__register">
        Sign up
      </button>
    </form>
  );

  const footerForm: JSX.Element = (
    <>
      Have already an account ?<NavLink to="/login">Login here</NavLink>
    </>
  );
  return (
    <FormLoginRegister
      formInput={formRegister}
      nameForm="Registration Form"
      footerElement={footerForm}
      textErrorResponse={textErrorResponse}
    />
  );
}
