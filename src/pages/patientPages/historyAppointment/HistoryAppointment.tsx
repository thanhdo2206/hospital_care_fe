import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { createFakeServer } from "@mui/x-data-grid-generator";
import React, { useEffect, useState } from "react";

import { IHistoryAppointmentPatient } from "../../../interface/AppointmentInterface";

import { getHistoryAppointmentPatientService } from "../../../services/appointmentService";
import { convertVND } from "../../../utils/convertMoney";
import { addHoursToDate, formatDate, getTimeZone } from "../../../utils/date";
import { StatusAppointment } from "../../../constants/enums";
import { AUTH } from "../../../constants/constants";
import { getStorage } from "../../../utils/localStorage";
import "../../../assets/css/pages/patientPage/historyAppointment/history_appointment.css";

const SERVER_OPTIONS = {
  useCursorPagination: false,
};

const { useQuery } = createFakeServer({}, SERVER_OPTIONS);

type Props = {};

export default function HistoryAppointment(props: Props) {
  const auth = getStorage(AUTH);
  const [appointmentHistory, setAppointmentHistory] = useState<
    IHistoryAppointmentPatient[]
  >([]);
  useEffect(() => {
    const getAppointmentHistoryApi = async () => {
      if (auth) {
        const result = await getHistoryAppointmentPatientService();
        setAppointmentHistory(result);
      }
    };
    getAppointmentHistoryApi();
  }, []);

  const columns: GridColDef[] = [
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "doctor",
      headerName: "Doctor Name",
      width: 270,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const doctor = params.value;
        return (
          <div className="infor_doctor">
            <img src={doctor.avatar} alt="" />
            <div>
              <p>
                Dr. {doctor.firstName} {doctor.lastName}
              </p>
              <p className="department">{doctor.departmentName}</p>
            </div>
          </div>
        );
      },
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "appointmentDate",
      headerName: "Appointment Date",
      sortable: false,
      width: 240,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "startTime",
      headerName: "Start Time",
      sortable: false,
      width: 120,
    },
    {
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName} </strong>
      ),
      field: "endTime",
      headerName: "End Time",
      sortable: false,
      width: 110,
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
  ];

  const rows = appointmentHistory.map(
    (appointmentHistory: IHistoryAppointmentPatient, index: number) => {
      const rowItem = {
        id: index,
        appointmentId: appointmentHistory.id,

        doctor: {
          departmentName: appointmentHistory.departmentName,
          firstName: appointmentHistory.firstNameDoctor,
          lastName: appointmentHistory.lastNameDoctor,
          avatar: appointmentHistory.avatarDoctor,
        },
        appointmentDate: formatDate(new Date(appointmentHistory.startTime)),
        startTime: getTimeZone(appointmentHistory.startTime),
        endTime: getTimeZone(
          addHoursToDate(
            new Date(appointmentHistory.startTime),
            appointmentHistory.duration
          )
        ),
        price: convertVND(appointmentHistory.examinationPrice),
        status: appointmentHistory.status,
      };

      return rowItem;
    }
  );

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
    <>
      <div className="title__box">
        <h3>Appointments</h3>
        <p>You can check your appointments here</p>
      </div>
      <div className="container_table_historyAppointment">
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
          pageSize={5}
          loading={isLoading}
          pagination
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}
