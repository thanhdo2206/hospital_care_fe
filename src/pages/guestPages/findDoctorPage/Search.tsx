import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ButtonCustomize from "../../../components/ButtonCustomize";
import { DispatchType } from "../../../redux/configStore";
import { searchNameMedicalExaminationTimeThunk } from "../../../redux/slices/medicalExaminationSlice";
import { ProgressListener } from "../../../components/Progress";
import { useSearchParams } from "react-router-dom";

type Props = {
  handleOnLoading: () => void;
  handleOffLoading: () => void;
};

export default function Search(props: Props) {
  const { handleOnLoading, handleOffLoading } = props;
  const [inputSearch, setInputSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch: DispatchType = useDispatch();

  useEffect(() => {
    getFilterURL();
  }, []);

  useEffect(() => {
    setFilterInitial();
  }, [searchParams]);

  const getFilterURL = async () => {
    const nameDoctor = searchParams.get("nameDoctor");
    await setInputSearch(nameDoctor ?? "");
    if (nameDoctor) await searchApi(nameDoctor);
  };

  const setFilterInitial = () => {
    const categories = searchParams.get("categories");
    const paramsMinPrice = searchParams.get("minPrice");

    if (categories || paramsMinPrice) {
      setInputSearch("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchParams({ nameDoctor: inputSearch });
    searchApi(inputSearch);
    if (!inputSearch) {
      setSearchParams(undefined);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(event.target.value);
  };

  const searchApi = async (nameDoctor: string) => {
    handleOnLoading();
    await dispatch(searchNameMedicalExaminationTimeThunk(nameDoctor));
    handleOffLoading();
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
