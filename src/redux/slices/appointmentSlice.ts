import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IAppointmentPageable } from "../../interface/AppointmentInterface";
import {
  changeStatusAppointmentService,
  getAllAppointmentDoctorPageableService,
} from "../../services/appointmentService";
import { DispatchType } from "../configStore";

interface AppointmentState {
  appointmentPageable: IAppointmentPageable | null;
}
const initialState: AppointmentState = {
  appointmentPageable: null,
};

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState,
  reducers: {
    getAllAppointmentDoctorPageableAction: (
      state: AppointmentState,
      action: PayloadAction<IAppointmentPageable>
    ) => {
      state.appointmentPageable = action.payload;
    },
  },
});

export const { getAllAppointmentDoctorPageableAction } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;

export const changeStatusAppointmentThunk = (
  appointmentId: number,
  appointmentStatus: number
) => {
  return async (dispatch: DispatchType) => {
    try {
      await changeStatusAppointmentService(appointmentId, appointmentStatus);

      dispatch(getAllAppointmentDoctorPageableThunk(1, 4, 0));
    } catch (error) {
      return error;
    }
  };
};

export const getAllAppointmentDoctorPageableThunk = (
  pageIndex: number,
  limit: number,
  appointmentStatus: number
) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getAllAppointmentDoctorPageableService(
        pageIndex,
        limit,
        appointmentStatus
      );

      dispatch(getAllAppointmentDoctorPageableAction(data));
    } catch (error) {
      return error;
    }
  };
};
