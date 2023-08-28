import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IMedicalExaminationTime } from "../../interface/MedicalExaminationInterface";
import {
  filterMedicalExaminationTimeByCategoryAndPriceService,
  getAllMedicalExaminationTimeService,
  getDetailMedicalExaminationTimeService,
  searchNameMedicalExaminationTimeService,
} from "../../services/medicalExaminationService";
import { DispatchType } from "../configStore";

export type MedicalExaminationState = {
  arrMedicalExaminations: IMedicalExaminationTime[] | null;
  arrDeparmentId: number[];
  medicalExaminationDetail: IMedicalExaminationTime | null;
};

const initialState: MedicalExaminationState = {
  arrMedicalExaminations: null,
  arrDeparmentId: [],
  medicalExaminationDetail: null,
};

const medicalExaminationSlice = createSlice({
  name: "medicalExaminationSlice",
  initialState,
  reducers: {
    getAllMedicalExaminationTimeAction: (
      state: MedicalExaminationState,
      action: PayloadAction<IMedicalExaminationTime[]>
    ) => {
      state.arrMedicalExaminations = action.payload;
    },
    getDetailMedicalExaminationTimeAction: (
      state: MedicalExaminationState,
      action: PayloadAction<IMedicalExaminationTime>
    ) => {
      state.medicalExaminationDetail = action.payload;
    },
  },
});

export const {
  getAllMedicalExaminationTimeAction,
  getDetailMedicalExaminationTimeAction,
} = medicalExaminationSlice.actions;

export default medicalExaminationSlice.reducer;

export const filterMedicalExaminationTimeThunkByCategoryAndPrice = (
  categories: string,
  minPrice: number,
  maxPrice: number
) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await filterMedicalExaminationTimeByCategoryAndPriceService(
        categories,
        minPrice,
        maxPrice
      );

      dispatch(getAllMedicalExaminationTimeAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const getAllMedicalExaminationTimeThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getAllMedicalExaminationTimeService();

      dispatch(getAllMedicalExaminationTimeAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const getDetailMedicalExaminationTimeThunk = (id: string) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getDetailMedicalExaminationTimeService(id);

      dispatch(getDetailMedicalExaminationTimeAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const searchNameMedicalExaminationTimeThunk = (name: string) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await searchNameMedicalExaminationTimeService(name);

      dispatch(getAllMedicalExaminationTimeAction(data));
    } catch (error) {
      return error;
    }
  };
};
