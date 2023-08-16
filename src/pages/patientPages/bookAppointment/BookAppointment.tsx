import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../../../assets/css/pages/patientPage/bookAppointment/book_appointment.css";
import { ITimeSlotDetail } from "../../../interface/TimeSlotInterface";
import { getDetailTimeSlotService } from "../../../services/timeSlotService";

import BookingSummary from "./BookingSummary";
import FormAppointment from "./FormAppointment";

type Props = {};

export default function BookAppointment(props: Props) {
  const params = useParams();

  const [timeSlotResponse, setTimeSlotResponse] = useState<ITimeSlotDetail>();

  const getDetailTimeSlot = async () => {
    const id: string | undefined = params.id;
    const timeSlotDetail: ITimeSlotDetail = await getDetailTimeSlotService(
      id as string
    );
    setTimeSlotResponse(timeSlotDetail);
  };

  useEffect(() => {
    getDetailTimeSlot();
  }, [params.id]);

  return (
    <div className="book__appointment">
      <FormAppointment timeSlotResponse={timeSlotResponse} />

      <BookingSummary timeSlot={timeSlotResponse} />
    </div>
  );
}
