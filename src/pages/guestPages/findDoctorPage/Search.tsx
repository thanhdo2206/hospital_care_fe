import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ButtonCustomize from "../../../components/ButtonCustomize";
import { DispatchType } from "../../../redux/configStore";
import { searchNameMedicalExaminationTimeThunk } from "../../../redux/slices/medicalExaminationSlice";
import { ProgressListener } from "../../../components/Progress";

export default function Search() {
  const [inputSearch, setInputSearch] = useState("");

  const dispatch: DispatchType = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ProgressListener.emit("start");

    setTimeout(() => {
      dispatch(searchNameMedicalExaminationTimeThunk(inputSearch));

      ProgressListener.emit("stop");
    }, 2000);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  return (
    <>
      <form action="" className="form__search" onSubmit={handleSubmit}>
        <div className="container__input-search">
          <SearchIcon className="icon__search" />
          <input
            className="input__search"
            placeholder="Search name ...."
            value={inputSearch}
            onChange={handleChange}
          />
          <ButtonCustomize
            text="Search"
            className="btn__search"
            type="submit"
          />
        </div>
      </form>
    </>
  );
}
