import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import React from "react";
import { toast } from "react-toastify";

import { IAppointment } from "../../../interface/AppointmentInterface";

import { changeStatusAppointmentService } from "../../../services/appointmentService";
import { convertVND } from "../../../utils/convertMoney";
import {
  addHoursToDate,
  checkPassCurrentDay,
  formatDate,
  getTimeZone,
} from "../../../utils/date";
import { StatusAppointment } from "../../../constants/enums";
import { IMedicalExamination } from "../../../interface/MedicalExaminationInterface";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery } = createFakeServer({}, SERVER_OPTIONS);

type Props = {
  appointments: IAppointment[];
  medicalExamination?: IMedicalExamination;
  getAllAppointmentPatientForDoctor: () => void;
};

export default function TableAppointment(props: Props) {
  const {
    appointments,
    getAllAppointmentPatientForDoctor,
    medicalExamination,
  } = props;

  const changeStatusAppointment = async (
    appointment: IAppointment,
    appointmentStatusChange: number
  ) => {
    await changeStatusAppointmentService(
      appointment.id,
      appointmentStatusChange
    );

    await getAllAppointmentPatientForDoctor();
  };

  const columns: GridColDef[] = [
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "bookingDate",
      headerName: "Booking Date",
      width: 250,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "startTime",
      headerName: "Start Time",
      sortable: false,
      width: 160,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "endTime",
      headerName: "End Time",
      sortable: false,
      width: 160,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "price",
      headerName: "Price",
      sortable: false,
      width: 120,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value;
        if (status === StatusAppointment.Pending)
          return <p className="text__status pending">Pending</p>;
        if (status === StatusAppointment.Approved)
          return <p className="text__status approved">Approved</p>;
        if (status === StatusAppointment.Cancel)
          return <p className="text__status cancel">Cancel</p>;
      },
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "action",
      headerName: "Action",
      sortable: false,
      filterable: false,
      width: 300,
      renderCell: (params: GridRenderCellParams) => {
        const { appointment, status } = params.row;
        const { TimeSlot } = appointment;

        if (
          status === StatusAppointment.Pending &&
          checkPassCurrentDay(TimeSlot.startTime)
        ) {
          return (
            <>
              <Button
                variant="contained"
                className="btn accept"
                startIcon={<CheckOutlinedIcon />}
                onClick={() => {
                  changeStatusAppointment(
                    appointment,
                    StatusAppointment.Approved
                  );
                  toast.success("Appointment was approved successfully");
                }}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                className="btn cancel"
                startIcon={<CloseOutlinedIcon />}
                onClick={() => {
                  changeStatusAppointment(
                    appointment,
                    StatusAppointment.Cancel
                  );
                  toast.success("Appointment was canceled successfully");
                }}
              >
                Cancel
              </Button>
            </>
          );
        }
      },
    },
  ];

  const rows = appointments.map((item, index) => {
    const timeSlot = item.TimeSlot;

    const rowItem = {
      id: index,
      appointmentId: item.id,
      bookingDate: formatDate(new Date(timeSlot.startTime)),
      startTime: getTimeZone(timeSlot.startTime),
      endTime: getTimeZone(
        addHoursToDate(new Date(timeSlot.startTime), timeSlot.duration)
      ),
      price: convertVND(medicalExamination?.examinationPrice),
      status: item.status,
      appointment: item,
    };

    return rowItem;
  });

  // loading
  const [page, setPage] = React.useState(0);

  const queryOptions = React.useMemo(
    () => ({
      page,
    }),
    [page]
  );

  const { isLoading } = useQuery(queryOptions);

  return (
    <div className="container__table__appointment">
      <DataGrid
        sx={{
          boxShadow: 2,
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader,.MuiDataGrid-cell": {
            padding: "0px 26px",
          },
        }}
        rows={rows}
        rowHeight={70}
        disableSelectionOnClick
        columns={columns}
        pageSize={6}
        loading={isLoading}
        pagination
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
