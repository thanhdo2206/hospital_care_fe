import Grid from "@mui/material/Grid";

import { IMedicalExaminationTime } from "../../../interface/MedicalExaminationInterface";
import ShortDescriptionDoctor from "./ShortDescriptionDoctor";
import TimeSlots from "./TimeSlots";

type Props = {
  examinationAndTime: IMedicalExaminationTime;
};

export default function InformationAppointment(props: Props) {
  const { examinationAndTime } = props;
  const { Department, timeSlots, ...medicalExamination } = examinationAndTime;

  return (
    <div className="box__container__information">
      <Grid container className="container__information-appointment">
        <Grid item xs={7} sx={{ borderRight: "1px solid #ccc" }}>
          <ShortDescriptionDoctor
            medical={medicalExamination}
            department={Department}
          />
        </Grid>
        <Grid item xs={5}>
          <TimeSlots
            timeSlotsResponse={timeSlots}
            examinationPrice={medicalExamination.examinationPrice}
            examinationTitle={medicalExamination.title}
          />
        </Grid>
      </Grid>
    </div>
  );
}
