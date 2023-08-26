import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import {
  CHECK_EMAIL_EMPTY,
  CHECK_EMAIL_MATCH_REGEX,
  CHECK_PASSWORD_EMPTY,
} from "../../../utils/validateForm";
import { EMAIL_REGEX } from "../../../utils/regex";
import * as Yup from "yup";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import FormLoginRegister from "../../../templates/FormLoginRegister";
import { IPatientLogin, IUser } from "../../../interface/UserInterface";
import { loginService } from "../../../services/userService";
import { ROLE } from "../../../constants/enums";
import { ProgressListener } from "../../../components/Progress";

type Props = {};

export default function Login({}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const [textErrorResponse, setTextErrorResponse] = useState<string>("");

  const formik = useFormik<IPatientLogin>({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required(CHECK_EMAIL_EMPTY)
        .matches(EMAIL_REGEX, CHECK_EMAIL_MATCH_REGEX),
      password: Yup.string().required(CHECK_PASSWORD_EMPTY),
    }),

    onSubmit: (values) => {
      ProgressListener.emit("start");

      loginApi(values);
    },
  });

  const { values, errors, handleChange, handleSubmit } = formik;

  const loginApi = async (dataLogin: IPatientLogin) => {
    const response = await loginService(dataLogin);
    ProgressListener.emit("stop");

    if (response.statusCode && response.statusCode > 400) {
      setTextErrorResponse(response.message);
      return;
    }
    navigateAfterLogin(response.user);
  };

  const navigateAfterLogin = (user: IUser) => {
    if (user) {
      if (user.role === ROLE.DOCTOR) {
        navigate("/doctor/appointment");
        return;
      }

      if (user.role === ROLE.PATIENT) {
        navigate("/search-doctor");
        return;
      }
    }
  };

  const formLogin: JSX.Element = (
    <form action="" onSubmit={handleSubmit} className="form__input">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12} md={12}>
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
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Grid>
      </Grid>

      <button type="submit" className="btn__login__register">
        Login
      </button>
    </form>
  );

  const footerForm: JSX.Element = (
    <>
      Don't have an account ?<NavLink to="/sign-up">Signup now</NavLink>
    </>
  );
  return (
    <FormLoginRegister
      formInput={formLogin}
      nameForm="Login Form"
      footerElement={footerForm}
      textErrorResponse={textErrorResponse}
    />
  );
}
