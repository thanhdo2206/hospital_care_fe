import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import ButtonCustomize from "../../../components/ButtonCustomize";
import ModalConfirm from "../../../components/ModalConfirm";
import { ITimeSlotDetail } from "../../../interface/TimeSlotInterface";
import { IUser } from "../../../interface/UserInterface";
import { getAllMedicalExaminationTimeThunk } from "../../../redux/slices/medicalExaminationSlice";
// import { getListAppointment } from "../../../redux/thunk/appointmentThunk";
import { bookAppointmentService } from "../../../services/appointmentService";
import { PHONE_REGEX_VN } from "../../../utils/regex";
import {
  CHECK_ADDRESS_EMPTY,
  CHECK_FIRST_NAME_EMPTY,
  CHECK_LAST_NAME_EMPTY,
  CHECK_PHONE_NUMBER_EMPTY,
  CHECK_PHONE_NUMBER_MATCH_REGEX,
} from "../../../utils/validateForm";
import CustomizedSwitch from "./CustomizedSwitch";
import { DispatchType, RootState } from "../../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_ACTION_CONFIRM } from "../../../constants/constants";
import { updateProfileUserThunk } from "../../../redux/slices/userSlice";
import { ProgressListener } from "../../../components/Progress";

const flagVN = require("../../../assets/img/vietnam_flag.png");

type IPatientInformation = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  gender: number;
  [key: string]: any;
};

type Props = {
  timeSlotResponse?: ITimeSlotDetail;
};

export default function FormAppointment(props: Props) {
  const { timeSlotResponse } = props;
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const [checkSwitch, setCheckSwitch] = useState(false);
  const navigate = useNavigate();
  const dispatch: DispatchType = useDispatch();

  const formik = useFormik<IPatientInformation>({
    initialValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      address: currentUser.address,
      gender: currentUser.gender ? 1 : 0,
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(CHECK_FIRST_NAME_EMPTY),
      lastName: Yup.string().required(CHECK_LAST_NAME_EMPTY),
      phoneNumber: Yup.string()
        .required(CHECK_PHONE_NUMBER_EMPTY)
        .matches(PHONE_REGEX_VN, CHECK_PHONE_NUMBER_MATCH_REGEX),
      address: Yup.string().required(CHECK_ADDRESS_EMPTY),
    }),

    onSubmit: (values) => {
      ProgressListener.emit("start");

      const inputData: IUser = {
        ...values,
        gender: +values.gender === 1,
      };

      if (checkSwitch) {
        updateProfile(inputData);
      }

      bookAppointmentApi();
    },
  });

  const { values, errors, handleChange, handleSubmit, handleBlur } = formik;

  const bookAppointmentApi = async () => {
    await bookAppointmentService(
      timeSlotResponse?.doctorId as number,
      timeSlotResponse?.id as number
    );
    await dispatch(getAllMedicalExaminationTimeThunk());
    ProgressListener.emit("stop");

    // await dispatch(getListAppointment());
    toast.success("Your appointment has been booked successfully.");
    navigate("/patient/dashboard/history-appointment");
  };

  const updateProfile = async (dataUserProfile: IUser) => {
    await dispatch(updateProfileUserThunk(dataUserProfile));
  };

  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      values.firstName = currentUser.firstName;
      values.lastName = currentUser.lastName;
      values.gender = currentUser.gender ? 1 : 0;
      values.phoneNumber = currentUser.phoneNumber;
      values.address = currentUser.address;

      Object.keys(errors).forEach((key: any) => {
        errors[key] = "";
      });
    }
    setCheckSwitch(event.target.checked);
  };

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const toggleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
  };

  const handleBookAppointment = async (type: string) => {
    if (type === MODAL_ACTION_CONFIRM) {
      handleSubmit();
    }
    toggleModalConfirm();
  };

  return (
    <>
      <div className="container__form__book box__personal__infor">
        <div className="title__box">
          <h3 className="form__title">Personal Information</h3>
        </div>

        <div className="inner__box">
          <div className="container__switch">
            <CustomizedSwitch
              handleChange={handleChangeSwitch}
              checkSwitch={checkSwitch}
            />
            {checkSwitch ? (
              <p className="text__notification">
                If you change your information, your personal information will
                be updated
              </p>
            ) : (
              ""
            )}
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="container__input">
              <label className="label__input">
                First Name <span className="sign__required">*</span>
              </label>
              <TextField
                disabled={!checkSwitch}
                fullWidth
                className="text__field"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. Do Van"
                error={errors.firstName ? true : false}
                helperText={errors.firstName}
                name="firstName"
                value={values.firstName}
              />
            </div>

            <div className="container__input">
              <label className="label__input">
                Last Name <span className="sign__required">*</span>
              </label>
              <TextField
                disabled={!checkSwitch}
                fullWidth
                className="text__field"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. Duc Thanh"
                error={errors.lastName ? true : false}
                helperText={errors.lastName}
                name="lastName"
                value={values.lastName}
              />
            </div>

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
              >
                <FormControlLabel
                  value={0}
                  control={<Radio size="small" />}
                  label="Female"
                  className="form__control__label"
                  disabled={!checkSwitch}
                />
                <FormControlLabel
                  value={1}
                  control={<Radio size="small" />}
                  label="Male"
                  className="form__control__label"
                  disabled={!checkSwitch}
                />
              </RadioGroup>
            </div>

            <div className="container__input">
              <label className="label__input">
                Phone Number <span className="sign__required">*</span>
              </label>
              <TextField
                disabled={!checkSwitch}
                fullWidth
                className="text__field phone__input"
                onBlur={handleBlur}
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

            <div className="container__input">
              <label className="label__input">
                Address <span className="sign__required">*</span>
              </label>
              <TextField
                disabled={!checkSwitch}
                fullWidth
                className="text__field"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. 48 Doan Van Cu, Lien Chieu District, Da Nang City"
                error={errors.address ? true : false}
                helperText={errors.address}
                name="address"
                value={values.address}
              />
            </div>
          </form>

          <ButtonCustomize
            text="Book an appointment"
            onClickBtn={() => {
              if (Object.keys(errors).length === 0 || !checkSwitch)
                toggleModalConfirm();
            }}
          />
        </div>
      </div>

      <ModalConfirm
        openModalConfirm={openModalConfirm}
        onAction={handleBookAppointment}
        title="Book Appointment"
        textBtn="Create"
        backgroundColorBtnConfirm="var(--primary-color)"
        contentBody={
          <>
            <h2 style={{ padding: "20px 0px" }}>Are you sure ?</h2>
            <p>Do you really want to book appointment?</p>
            {checkSwitch ? (
              <p style={{ color: "#da4040" }}>
                Your personal information will be updated.
              </p>
            ) : (
              ""
            )}
          </>
        }
      />
    </>
  );
}
