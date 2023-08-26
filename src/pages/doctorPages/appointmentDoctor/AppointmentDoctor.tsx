import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import "../../../assets/css/pages/doctorPage/appointmentDoctor/appointment_doctor.css";
import { IAppointment } from "../../../interface/AppointmentInterface";
import { DispatchType, RootState } from "../../../redux/configStore";
import {
  changeStatusAppointmentThunk,
  getAllAppointmentDoctorPageableThunk,
} from "../../../redux/slices/appointmentSlice";

import {
  addHoursToDate,
  checkPassCurrentDay,
  formatDate,
  getTimeZone,
} from "../../../utils/date";

import SketonItem from "./SketonItem";
import { StatusAppointment } from "../../../constants/enums";
import { PAGINATION_LIMIT } from "../../../constants/constants";
import Avatar from "react-avatar";

type Props = {};

const arrStatus = [
  { value: 0, text: "Pending" },
  { value: 1, text: "Approved" },
  { value: 2, text: "Cancel" },
];

export default function AppointmentDoctor({}: Props) {
  const dispatch: DispatchType = useDispatch();

  const { appointmentPageable } = useSelector(
    (state: RootState) => state.appointmentSlice
  );

  const [status, setStatus] = useState(`${StatusAppointment.Pending}`);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useSelector((state: RootState) => state.userSlice);

  const getAllAppointmentDoctorPageable = async (
    pageIndex: number,
    limit: number,
    appointmentStatus: number
  ) => {
    setIsLoading(true);
    await setTimeout(() => {
      dispatch(
        getAllAppointmentDoctorPageableThunk(
          pageIndex,
          limit,
          appointmentStatus
        )
      );
      setIsLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getAllAppointmentDoctorPageable(page, PAGINATION_LIMIT, +status);
  }, []);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const pageIndex: number = value;
    setPage(value);
    getAllAppointmentDoctorPageable(pageIndex, PAGINATION_LIMIT, +status);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    const appointmentStatus: number = +event.target.value;
    setStatus(event.target.value);
    setPage(1);

    getAllAppointmentDoctorPageable(1, PAGINATION_LIMIT, appointmentStatus);
  };

  const changeStatusAppointmentByDoctor = async (
    appointmentId: number,
    appointmentStatus: number,
    appointment: IAppointment
  ) => {
    await dispatch(
      changeStatusAppointmentThunk(appointmentId, appointmentStatus)
    );
  };

  const renderStatusActionAppointment = (
    checkStatus: number,
    appointmentId: number,
    appointment: IAppointment
  ) => {
    const { TimeSlot } = appointment;
    if (
      checkStatus === StatusAppointment.Pending &&
      checkPassCurrentDay(TimeSlot.startTime)
    ) {
      return (
        <>
          <Button
            variant="contained"
            className="btn accept"
            startIcon={<CheckOutlinedIcon />}
            onClick={() => {
              changeStatusAppointmentByDoctor(
                appointmentId,
                StatusAppointment.Approved,
                appointment
              );
              toast.success("Appointment was approved successfully");
            }}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            className="btn cancel"
            startIcon={<CloseOutlinedIcon />}
            onClick={() => {
              changeStatusAppointmentByDoctor(
                appointmentId,
                StatusAppointment.Cancel,
                appointment
              );
              toast.success("Appointment was canceled successfully");
            }}
          >
            Cancel
          </Button>
        </>
      );
    }

    if (checkStatus === StatusAppointment.Pending) {
      return <span className="text__status pending">Pending</span>;
    }

    if (checkStatus === StatusAppointment.Approved) {
      return <span className="text__status approved">Approved</span>;
    }

    if (checkStatus === StatusAppointment.Cancel) {
      return <span className="text__status cancelled">Cancelled</span>;
    }
  };

  const renderAppointmentList = () => {
    return appointmentPageable?.listAppointment.map(
      (item: IAppointment, index: number) => {
        const { patient, TimeSlot } = item;
        const arrInforPatient = [
          {
            icon: <AccessTimeFilledOutlinedIcon className="icon__infor" />,
            value: `${getTimeZone(TimeSlot.startTime)} - ${getTimeZone(
              addHoursToDate(new Date(TimeSlot.startTime), TimeSlot.duration)
            )}`,
          },
          {
            icon: <CalendarMonthIcon className="icon__infor" />,
            value: formatDate(new Date(TimeSlot.startTime)),
          },
          {
            icon: <LocationOnIcon className="icon__infor" />,
            value: patient.address,
          },
          {
            icon: <EmailIcon className="icon__infor" />,
            value: patient.email,
          },
          {
            icon: <LocalPhoneIcon className="icon__infor" />,
            value: patient.phoneNumber,
          },
        ];
        return (
          <div className="appointment__item" key={index}>
            <div className="profile__infor">
              <div className="avatar__patient">
                {patient.avatar ? (
                  <img className="img__patient" src={patient.avatar} alt="" />
                ) : (
                  <Avatar facebookId="100008343750912" size="120" />
                )}
              </div>
              <div className="infor__patient">
                <NavLink
                  to={`/doctor/appointment/appointment-patient/${patient.id}`}
                >
                  <h4>{`${patient.firstName} ${patient.lastName}`}</h4>
                </NavLink>

                <ul className="infor__list">
                  {arrInforPatient.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.icon}
                        {item.value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="appointment__action">
              {renderStatusActionAppointment(item.status, item.id, item)}
            </div>
          </div>
        );
      }
    );
  };

  const renderSkeleton = () => {
    const arrSkeleton = [1, 2, 3, 4];
    return arrSkeleton.map((item, index) => {
      return <SketonItem key={index} />;
    });
  };

  return (
    <div className="container__appointment">
      <div className="appointment__doctor__list">
        <div className="container__title">
          <h3>Appointment Lists</h3>
          <FormControl sx={{ width: "175px" }}>
            <InputLabel id="status__label">Select Status</InputLabel>
            <Select
              labelId="status__label"
              id="demo-simple-select"
              label="Select Status"
              onChange={handleChangeSelect}
              className="select__status"
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: " rgba(0, 0, 0, 0.23)",
                },
              }}
              size="small"
              value={status}
            >
              {arrStatus.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={item.value}
                    className="select__item"
                  >
                    {item.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="appointment__list">
          {isLoading ? renderSkeleton() : renderAppointmentList()}
        </div>
      </div>

      <div className="pagnination__appointment">
        <Stack spacing={2}>
          <Pagination
            count={appointmentPageable?.totalPage}
            page={page}
            onChange={handleChangePagination}
            className="pagination"
            variant="outlined"
            size="large"
          />
        </Stack>
      </div>
    </div>
  );
}
