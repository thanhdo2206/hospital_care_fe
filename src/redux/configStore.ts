import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import medicalExaminationSlice from "./slices/medicalExaminationSlice";
import appointmentSlice from "./slices/appointmentSlice";
import timeSlotSlice from "./slices/timeSlotSlice";

export type DispatchType = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    userSlice,
    medicalExaminationSlice,
    timeSlotSlice,
    appointmentSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
