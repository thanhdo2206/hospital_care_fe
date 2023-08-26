import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ButtonCustomize from "../../../components/ButtonCustomize";
import ModalConfirm from "../../../components/ModalConfirm";
import { IUser } from "../../../interface/UserInterface";
import { PHONE_REGEX_VN } from "../../../utils/regex";
import {
  CHECK_ADDRESS_EMPTY,
  CHECK_AGE_EMPTY,
  CHECK_FIRST_NAME_EMPTY,
  CHECK_LAST_NAME_EMPTY,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX,
} from "../../../utils/validateForm";
import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_ACTION_CONFIRM } from "../../../constants/constants";
import { updateProfileUserThunk } from "../../../redux/slices/userSlice";
import { Grid, InputAdornment } from "@mui/material";
import "../../../assets/css/pages/patientPage/patientProfile/patient_profile.css";
import { ProgressListener } from "../../../components/Progress";

const flagVN = require("../../../assets/img/vietnam_flag.png");

type IPatientProfile = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  age?: number;
  gender: number;
};

type Props = {};

export default function PatientProfile({}: Props) {
  const dispatch: DispatchType = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.userSlice);

  const formik = useFormik<IPatientProfile>({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      address: currentUser.address,
      age: currentUser.age,
      gender: currentUser.gender ? 1 : 0,
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(CHECK_FIRST_NAME_EMPTY),
      lastName: Yup.string().required(CHECK_LAST_NAME_EMPTY),
      phoneNumber: Yup.string()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      address: Yup.string().required(CHECK_ADDRESS_EMPTY),
      age: Yup.string().required(CHECK_AGE_EMPTY),
    }),

    onSubmit: (values) => {},
  });

  const { values, errors, handleChange } = formik;

  const updateProfileApi = async (dataUserProfile: IUser) => {
    await dispatch(updateProfileUserThunk(dataUserProfile));
  };

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const toggleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
  };

  const handleEditProfile = async (type: string) => {
    if (type === MODAL_ACTION_CONFIRM) {
      ProgressListener.emit("start");
      const inputData: IUser = {
        ...values,
        gender: +values.gender === 1,
        age: +(values.age as number),
      };

      await setTimeout(() => {
        updateProfileApi(inputData);
        ProgressListener.emit("stop");
        toast.success("Your profile was updated successfully");
      }, 2000);
    }
    toggleModalConfirm();
  };

  return (
    <>
      <div className="container__profile__setting">
        <div className="title__box">
          <h3>Profile Settings</h3>
          <p>Here you can edit information about yourself</p>
        </div>

        <div className="inner__box">
          <form action="" className="form__input">
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
                    Age <span className="sign__required">*</span>
                  </label>
                  <TextField
                    fullWidth
                    className="text__field"
                    onChange={handleChange}
                    placeholder="e.g. 20"
                    error={errors.age ? true : false}
                    helperText={errors.age}
                    name="age"
                    value={values.age}
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
                    Address <span className="sign__required">*</span>
                  </label>
                  <TextField
                    fullWidth
                    className="text__field"
                    onChange={handleChange}
                    placeholder="e.g. 48 Doan Van Cu, Lien Chieu District, Da Nang City"
                    error={errors.address ? true : false}
                    helperText={errors.address}
                    name="address"
                    value={values.address}
                    type="text"
                  />
                </div>
              </Grid>

              <Grid item xs={12} lg={12} md={12}>
                <div className="container__input">
                  <label className="label__input">
                    Gender <span className="sign__required">*</span>
                  </label>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    // defaultValue={0}
                    name="gender"
                    onChange={handleChange}
                    value={values.gender}
                    className="radio__input"
                  >
                    <FormControlLabel
                      value={0}
                      control={<Radio size="small" />}
                      label="Female"
                      className="form__control__label"
                    />
                    <FormControlLabel
                      value={1}
                      control={<Radio size="small" />}
                      label="Male"
                      className="form__control__label"
                    />
                  </RadioGroup>
                </div>
              </Grid>
            </Grid>

            <ButtonCustomize
              text="Save"
              type="submit"
              className="btn__save__profile"
              onClickBtn={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                if (Object.keys(errors).length === 0) toggleModalConfirm();
              }}
            />
          </form>
        </div>

        <ModalConfirm
          openModalConfirm={openModalConfirm}
          onAction={handleEditProfile}
          title="Edit profile"
          textBtn="Save"
          backgroundColorBtnConfirm="var(--primary-color)"
          contentBody={
            <>
              <h2 style={{ padding: "20px 0px 10px 0px" }}>Are you sure ?</h2>
              <p>Do you really want to edit profile?</p>
            </>
          }
        />
      </div>
    </>
  );
}
