import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { ITimeSlot } from "../../../interface/TimeSlotInterface";
import { convertVND } from "../../../utils/convertMoney";
import {
  addHoursToDate,
  checkPassCurrentDay,
  formatDate,
  getTimeSlotsAfterCurrentDay,
  getTimeSlotsDateFirst,
  getTimeZone,
  removeDuplicatesDate,
  sortDate,
  sortStartTime,
} from "../../../utils/date";

type Props = {
  timeSlotsResponse?: ITimeSlot[];
  examinationPrice?: number;
};

export default function ScheduleExamination(props: Props) {
  const { timeSlotsResponse, examinationPrice } = props;

  const timeSlots = timeSlotsResponse
    ? timeSlotsResponse.filter((item) => !item.statusTimeSlot && checkPassCurrentDay(item.startTime))
    : [];

  const listTimeSlotsAfterCurrentDay: ITimeSlot[] = timeSlots
    ? getTimeSlotsAfterCurrentDay(timeSlots)
    : [];

  const listDate: Date[] = listTimeSlotsAfterCurrentDay.map((item) => {
    let date = new Date(item.startTime);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const listDateSort: Date[] = sortDate(removeDuplicatesDate(listDate));

  const listTimeSlotsCurrentDay: ITimeSlot[] = getTimeSlotsDateFirst(
    listTimeSlotsAfterCurrentDay,
    listDateSort[0]
  );

  const [listTimeSlot, setListTimeSlot] = useState(listTimeSlotsCurrentDay);

  useEffect(() => {
    setListTimeSlot(sortStartTime(listTimeSlotsCurrentDay));
  }, [timeSlotsResponse]);

  const handleDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const dateSelect: string = event.target.value;

    const listTimeOfDateSelect = listTimeSlotsAfterCurrentDay.filter((item) => {
      const dateItem = new Date(item.startTime);
      dateItem.setHours(0, 0, 0, 0);
      return dateItem.getTime() === new Date(dateSelect).getTime();
    });

    const listTimeSlotSort = sortStartTime(listTimeOfDateSelect);

    setListTimeSlot(listTimeSlotSort);
  };

  return (
    <div className="container__schedule">
      <div className="title__box">
        <h3>Book Appointment</h3>
      </div>
      <div className="box__schedule">
        <select
          name=""
          id=""
          className="schedule__select"
          onChange={handleDateSelect}
        >
          {listDateSort.map((date, index) => {
            return (
              <option key={index} value={date.toString()}>
                {formatDate(date)}
              </option>
            );
          })}
        </select>

        <div className="container__schedule--package">
          <div className="container__schedule--icon">
            <CalendarMonthIcon />
            <b>Schedule</b>
          </div>
          <div className="container__schedule__time">
            {listTimeSlot.map((item, index) => {
              return (
                <NavLink
                  key={index}
                  to={`/patient/book-appointment/${item.id}`}
                >
                  <span className="schedule__time--item">
                    {`${getTimeZone(item.startTime)} - ${getTimeZone(
                      addHoursToDate(new Date(item.startTime), item.duration)
                    )}`}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      <div className="examination__price">
        <div>
          <b>Examination Price: </b>
          <span className="value__price">
            {examinationPrice ? convertVND(examinationPrice) : ""}
          </span>
        </div>

        <div>
          <b>Booking fee: </b>
          <span className="value__price">Free</span>
        </div>
      </div>
    </div>
  );
}
