import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../../assets/css/pages/guestPage/detailExamination/detail_examination.css";
import { DispatchType, RootState } from "../../../redux/configStore";
import { getDetailMedicalExaminationTimeThunk } from "../../../redux/slices/medicalExaminationSlice";
import ScheduleExamination from "./ScheduleExamination";
import TabInfomation from "./TabInfomation";

export default function DetailExamination() {
  const dispatch: DispatchType = useDispatch();

  const params = useParams();

  const getDetailExamination = async () => {
    const id: string | undefined = params.id;
    dispatch(getDetailMedicalExaminationTimeThunk(id as string));
  };

  useEffect(() => {
    getDetailExamination();
  }, [params.id]);

  const { medicalExaminationDetail } = useSelector(
    (state: RootState) => state.medicalExaminationSlice
  );

  const department = medicalExaminationDetail?.Department;

  const timeSlotsResponse = medicalExaminationDetail?.timeSlots;

  return (
    <div className="container__detail__examination">
      <div className="container__information">
        <Grid
          container
          columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 5 }}
          className=""
        >
          <Grid item lg={8} className="">
            <div className="container__short__information">
              <div className="container__image__doctor">
                {medicalExaminationDetail?.image ? (
                  <img
                    className="img__doctor"
                    src={medicalExaminationDetail.image}
                    alt=""
                  />
                ) : (
                  <Avatar facebookId="100008343750912" size="120" />
                )}
              </div>
              <div className="brief__information">
                <h1>{medicalExaminationDetail?.title}</h1>
                <div className="brief__text">
                  <p>
                    {medicalExaminationDetail?.shortDescription.split("\n")[0]}
                  </p>
                </div>
                <div className="department">
                  <img src={department?.backgroundImage} alt="" />
                  <span>{department?.name}</span>
                </div>
              </div>
            </div>

            <div className="container__detail__information">
              <TabInfomation medical={medicalExaminationDetail} />
            </div>
          </Grid>

          <Grid item lg={4} className="">
            <ScheduleExamination
              timeSlotsResponse={timeSlotsResponse}
              examinationPrice={medicalExaminationDetail?.examinationPrice}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
