import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/configStore";
import Avatar from "react-avatar";
import { NavLink } from "react-router-dom";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { uploadAvatarUserThunk } from "../../../redux/slices/userSlice";
import { IMAGE_REGEX } from "../../../utils/regex";
import { CHECK_IMAGE_MATCH_REGEX } from "../../../utils/validateForm";
import { ProgressListener } from "../../../components/Progress";
import { toast } from "react-toastify";
import { Tooltip } from "@mui/material";
type Props = {};

const arrSideBar = [
  {
    name: "Profile Settings",
    url: "/patient/dashboard/profile",
  },
  {
    name: "Appointments",
    url: "/patient/dashboard/history-appointment",
  },
];

export default function PatientSidebar({}: Props) {
  const dispatch: DispatchType = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const namePatient = `${currentUser.firstName} ${currentUser.lastName}`;
  const [valueFile, setValueFile] = useState<File>();
  const [errorValidateImg, setErrorValidateImg] = useState<string>();

  const handleChangeInputFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      setValueFile(event.target.files[0]);
      let formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      if (validateUploadAvatar(event.target.files[0])) {
        uploadAvatarApi(formData);
      }
    }
  };

  const validateUploadAvatar = (image: File) => {
    const checkRegex = image.name.match(IMAGE_REGEX);
    let error = checkRegex ? "" : CHECK_IMAGE_MATCH_REGEX;
    setErrorValidateImg(error);
    return checkRegex;
  };

  const uploadAvatarApi = async (formData: any) => {
    ProgressListener.emit("start");
    await dispatch(uploadAvatarUserThunk(formData));
    ProgressListener.emit("stop");
    toast.success("Avatar was uploaded successfully.");
  };

  const handleSubmit = () => {};
  return (
    <div className="container_patient_sidebar">
      <div className="avatar_patient">
        <form
          className="form__upload__img"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Tooltip title="Upload avatar" placement="right">
            <label htmlFor="upload__photo">
              <FileUploadRoundedIcon />
            </label>
          </Tooltip>
          <input
            type="file"
            name="avatar"
            id="upload__photo"
            onChange={handleChangeInputFile}
            accept="image/png, image/jpg, image/jpeg"
          />
        </form>
        {currentUser.avatar ? (
          <img className="" src={currentUser.avatar} alt="" />
        ) : (
          <Avatar style={{objectFit:'cover'}} facebookId="100008343750912" size="150" round={true} />
        )}
      </div>
      <p className="error__input__image">{errorValidateImg}</p>
      <h1>{namePatient}</h1>
      <ul className="list_patient_sidebar">
        {arrSideBar.map((item, index) => {
          return (
            <li key={index}>
              <NavLink className="nav_link" to={item.url}>
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
