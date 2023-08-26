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
  timeSlotsResponse: ITimeSlot[];
  examinationPrice: number;
  examinationTitle: string;
};

export default function TimeSlots(props: Props) {
  const { timeSlotsResponse, examinationPrice, examinationTitle } = props;

  const timeSlots = timeSlotsResponse.filter(
    (item) => !item.statusTimeSlot && checkPassCurrentDay(item.startTime)
  );

  const listTimeSlotsAfterCurrentDay: ITimeSlot[] =
    timeSlots.length === 0 ? [] : getTimeSlotsAfterCurrentDay(timeSlots);

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

  // code fix
  const [listTimeSlot, setListTimeSlot] = useState<ITimeSlot[]>([]);

  useEffect(() => {
    setListTimeSlot(sortStartTime(listTimeSlotsCurrentDay));
  }, [timeSlotsResponse]);

  // -----------

  const getDateSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    <div className="time__slot-box">
      <select name="" id="" className="select__day" onChange={getDateSelect}>
        {listDateSort.map((date, index) => {
          return (
            <option key={index} value={date.toString()}>
              {formatDate(date)}
            </option>
          );
        })}
      </select>
      <div className="package__schedule">
        <div className="container__icon-time">
          <CalendarMonthIcon />
          <b>Schedule</b>
        </div>
        <div className="container__time-slots">
          {listTimeSlot.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={`/patient/book-appointment/${item.id}`}
                state={{ examinationPrice, examinationTitle }}
              >
                <span className="time__slot-item">
                  {`${getTimeZone(item.startTime)} - ${getTimeZone(
                    addHoursToDate(new Date(item.startTime), item.duration)
                  )}`}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="container__price">
        <b>Examination Price: </b>
        <span>{convertVND(examinationPrice)}</span>
      </div>
    </div>
  );
}
