import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface/UserInterface";
import { DispatchType } from "../configStore";
import {
  getCurrentUserService,
  updateProfileUserService,
  uploadAvatarUserService,
} from "../../services/userService";

export type UserState = {
  currentUser: IUser;
};

const initialState: UserState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getCurrentUserAction: (state: UserState, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { getCurrentUserAction } = userSlice.actions;

export default userSlice.reducer;

export const getCurrentUserThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await getCurrentUserService();

      dispatch(getCurrentUserAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const logoutUserThunk = () => {
  return async (dispatch: DispatchType) => {
    try {
      localStorage.clear();
      dispatch(getCurrentUserAction({}));
    } catch (error) {
      return error;
    }
  };
};

export const updateProfileUserThunk = (dataUpdate: IUser) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await updateProfileUserService(dataUpdate);

      dispatch(getCurrentUserAction(data));
    } catch (error) {
      return error;
    }
  };
};

export const uploadAvatarUserThunk = (formData: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const data = await uploadAvatarUserService(formData);

      dispatch(getCurrentUserAction(data));
    } catch (error) {
      return error;
    }
  };
};
