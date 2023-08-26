import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ModalConfirm from "../../../components/ModalConfirm";
import { ITimeSlot } from "../../../interface/TimeSlotInterface";
import { ITimeSlotRequest } from "../../../interface/TimeSlotInterface";
import { deleteTimeSlotThunk } from "../../../redux/slices/timeSlotSlice";
import { editTimeSlotThunk } from "../../../redux/slices/timeSlotSlice";
import {
  MODAL_ACTION_CLOSE,
  MODAL_ACTION_CONFIRM,
  SUBMIT_MODAL_EDIT,
} from "../../../constants/constants";
import {
  addHoursToDate,
  checkDayOfWeek,
  checkExistArrayDate,
  getAllHour,
  getTimeZone,
  subDate,
} from "../../../utils/date";
import ModalEditTime from "./ModalEditTime";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/configStore";

type Props = {
  timeSlotResponse: ITimeSlot;
  timeSlotsOfDay: ITimeSlot[];
  dayOfWeek: Date;
};

type SelectTimeEdit = {
  startTime: string;
  endTime: string;
  [key: string]: any;
};

const arrStartTimeDefaut = getAllHour();

export default function TimeSlotItem(props: Props) {
  const dispatch: DispatchType = useDispatch();
  const { timeSlotsOfDay, timeSlotResponse, dayOfWeek } = props;
  // const { timeSlotDTO, appointmentId } = timeSlotResponse;
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [arrEndTime, setArrEndTime] = useState<Date[]>([]);
  const [arrStartTimeCorrect, setArrStartTimeCorrect] = useState<Date[]>([]);
  const [arrEndTimeCorrect, setArrEndTimeCorrect] = useState<Date[]>([]);

  const arrStartTimeDefautDayOfWeek = arrStartTimeDefaut.map(
    (startTimeDate) => {
      startTimeDate.setDate(dayOfWeek.getDate());
      startTimeDate.setMonth(dayOfWeek.getMonth());
      startTimeDate.setFullYear(dayOfWeek.getFullYear());

      return startTimeDate;
    }
  );

  const [selectTime, setSelectTime] = useState<SelectTimeEdit>({
    startTime: timeSlotResponse.startTime,
    endTime: `${addHoursToDate(
      new Date(timeSlotResponse.startTime),
      timeSlotResponse.duration
    )}`,
  });

  useEffect(() => {
    setSelectTime({
      startTime: timeSlotResponse.startTime,
      endTime: `${addHoursToDate(
        new Date(timeSlotResponse.startTime),
        timeSlotResponse.duration
      )}`,
    });

    createArrStartAndEndTime();
  }, [timeSlotsOfDay, dayOfWeek, timeSlotResponse]);

  const toggleModalConfirm = () => {
    setOpenModalConfirm(!openModalConfirm);
  };

  const onModalDeleteTimeSlot = async (type: string) => {
    if (type === MODAL_ACTION_CONFIRM) {
      await dispatch(deleteTimeSlotThunk(timeSlotResponse.id));
      toast.success("Time Slot was deleted successfully");
    }

    toggleModalConfirm();
  };

  const toggleModalEdit = () => {
    if (checkDayOfWeek(dayOfWeek)) setOpenModalEdit(!openModalEdit);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = { ...selectTime };
    value[event.target.name] = event.target.value;
    setSelectTime(value);
  };

  const handleEditTimeSlot = async (type: string) => {
    if (type === SUBMIT_MODAL_EDIT) {
      const minuteDuration: number = subDate(
        selectTime.startTime,
        selectTime.endTime
      );

      const startTimeUpdate = new Date(selectTime.startTime);

      const dataUpdate: ITimeSlotRequest = {
        startTime: startTimeUpdate.toISOString(),
        duration: minuteDuration,
      };

      await dispatch(editTimeSlotThunk(timeSlotResponse.id, dataUpdate));
      toast.success("Time Slot was edited successfully");
    }

    if (type === MODAL_ACTION_CLOSE) {
      setSelectTime({
        startTime: timeSlotResponse.startTime,
        endTime: `${addHoursToDate(
          new Date(timeSlotResponse.startTime),
          timeSlotResponse.duration
        )}`,
      });
    }

    toggleModalEdit();
  };

  const createArrStartAndEndTime = () => {
    const arrStartTimeCheck: Date[] = [];
    const arrEndTimeCheck: Date[] = [];

    timeSlotsOfDay.forEach((timeSlot) => {
      // const { timeSlotDTO } = item;
      const dayByStartTime = new Date(timeSlot.startTime);

      arrStartTimeCheck.push(dayByStartTime);
      arrEndTimeCheck.push(addHoursToDate(dayByStartTime, timeSlot.duration));

      if (timeSlot.duration === 60) {
        arrStartTimeCheck.push(addHoursToDate(dayByStartTime, 30));
        arrEndTimeCheck.push(addHoursToDate(dayByStartTime, 30));
      }
    });

    createArrStartTimeCorrect(arrStartTimeCheck, arrStartTimeDefautDayOfWeek);

    setArrEndTime(arrEndTimeCheck);
  };

  const createArrStartTimeCorrect = (
    arrStartTimeCheck: Date[],
    arrStartTimeMain: Date[]
  ) => {
    const arrTime: Date[] = arrStartTimeMain.filter((dayMainItem) => {
      return !checkExistArrayDate(arrStartTimeCheck, dayMainItem);
    });

    setArrStartTimeCorrect(arrTime);
  };

  const updateTime = () => {
    const startTimeDate = new Date(timeSlotResponse.startTime);
    const endTimeDate = addHoursToDate(
      startTimeDate,
      timeSlotResponse.duration
    );

    const arrEndTimeDelete: Date[] = [];

    if (!checkExistArrayDate(arrStartTimeCorrect, startTimeDate))
      arrStartTimeCorrect.push(startTimeDate);

    arrEndTimeDelete.push(endTimeDate);
    if (timeSlotResponse.duration === 60) {
      const timeAdd: Date = addHoursToDate(startTimeDate, 30);
      if (!checkExistArrayDate(arrStartTimeCorrect, timeAdd)) {
        arrStartTimeCorrect.push(timeAdd);
      }

      arrEndTimeDelete.push(timeAdd);
    }

    const arrEndTimeUpdate: Date[] = arrEndTime.filter((endTimeItem) => {
      return !checkExistArrayDate(arrEndTimeDelete, endTimeItem);
    });

    setArrEndTime([...arrEndTimeUpdate]);

    createEndTimeCorrectOriginal(arrEndTimeUpdate);
  };

  const createEndTimeCorrectOriginal = (arrEndTimeCheck: Date[]) => {
    const startTimeDate = new Date(selectTime.startTime);

    const arrEndTimeTemporary: Date[] = [
      addHoursToDate(startTimeDate, 30),
      addHoursToDate(startTimeDate, 60),
    ];

    const arrEndTimeCorrect: Date[] = arrEndTimeTemporary.filter(
      (endTimeTemporary) => {
        return !checkExistArrayDate(arrEndTimeCheck, endTimeTemporary);
      }
    );

    setArrEndTimeCorrect([...arrEndTimeCorrect]);
  };

  const renderTimeSlot = () => {
    return timeSlotResponse.statusTimeSlot ? (
      <span className="cursor__noDrop">{`${getTimeZone(
        timeSlotResponse.startTime
      )} - ${getTimeZone(
        addHoursToDate(
          new Date(timeSlotResponse.startTime),
          timeSlotResponse.duration
        )
      )}`}</span>
    ) : (
      <>
        <span
          onClick={() => {
            toggleModalEdit();
            updateTime();
          }}
        >{`${getTimeZone(timeSlotResponse.startTime)} - ${getTimeZone(
          addHoursToDate(
            new Date(timeSlotResponse.startTime),
            timeSlotResponse.duration
          )
        )}`}</span>
        {checkDayOfWeek(dayOfWeek) ? (
          <CloseIcon
            className="delete__time-icon"
            onClick={toggleModalConfirm}
          />
        ) : (
          ""
        )}
      </>
    );
  };
  return (
    <>
      <div
        className={`time__slot-item ${
          timeSlotResponse.statusTimeSlot ? "appointment" : ""
        }`}
      >
        {renderTimeSlot()}
      </div>

      <ModalConfirm
        openModalConfirm={openModalConfirm}
        onAction={onModalDeleteTimeSlot}
        textBtn="Delete"
        backgroundColorBtnConfirm="#cb4c48"
        title="Delete Time Slot"
        contentBody={
          <>
            <h3>You are about to delete a time slot</h3>
            <p style={{ color: "#da4040" }}>
              This will delete your time slot. Are you sure ?
            </p>
          </>
        }
      />
      <ModalEditTime
        openModalEdit={openModalEdit}
        onAction={handleEditTimeSlot}
        handleChange={handleChangeSelect}
        valueStartTime={selectTime.startTime}
        valueEndTime={selectTime.endTime}
        arrStartTimeCorrect={arrStartTimeCorrect}
        arrEndTime={arrEndTime}
        arrEndTimeCorrectOriginal={arrEndTimeCorrect}
      />
    </>
  );
}
