import React, { useState } from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllValidationCodesQuery } from "@/slices/validationCodeApiSlice";
import VerificationModal from "@/components/VerificationModal"; // Import the modal component
import Head from "next/head";

export default function UsersTable() {
  const { data: allCodes, refetch: fetchAllCodes } = useGetAllValidationCodesQuery(false);

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Track the selected row for verification

  const [rows, setRows] = useState([
    {
      id: 1,
      fullName: "Jon",
      email: "jon@gmail.com",
      verified: true,
      verificationCode: "VC00000001",
    },
    {
      id: 2,
      fullName: "Cersei",
      email: "cersei@gmail.com",
      verified: false,
      verificationCode: "VC00000002",
    },
    // ... other rows
  ]);

  const columns = [
    { field: "fullName", headerName: "User name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "verified",
      headerName: "Verified",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value ? (
            <DoneIcon style={{ color: "green" }} />
          ) : (
            <CloseIcon style={{ color: "red" }} />
          )}
        </div>
      ),
    },
    {
      field: "verificationCode",
      headerName: "Verification Code",
      width: 250,
      renderCell: (params) =>
        params.row.verified ? (
          params.row.verificationCode
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <EditNoteIcon
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => {
                setSelectedRow(params.row); // Set the selected row
                setOpen(true); // Open the modal
              }}
            />
          </div>
        ),
    },
  ];

  const VerificationCodes = [
    { field: "code", headerName: "Available Codes", width: 250 },
  ];

  const VerificationCodesRow = allCodes?.data?.map((codes) => ({
    id: codes.id,
    code: codes.code,
  }));

  const handleVerificationSuccess = (code) => {
    // Update the row data based on verification success
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.verificationCode === code ? { ...row, verified: true } : row
      )
    );
  };

  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>

      <div className="w-full min-h-screen flex flex-col justify-between">
        <Header />

        <div className="w-full h-full mx-auto mb-7 px-2 md:px-7">
          <div className="my-7 text-left w-full">
            <Link
              href={"/admin-dashboard"}
              className="font-koHo font-bold text-1xl text-blue-900 flex items-center justify-start"
            >
              <ArrowBack /> Dashboard
            </Link>
          </div>

          <div className="text-left w-full">
            <h1 className="font-Poppins font-semibold text-1xl md:text-[27px] xl:text-2xl">
              Vendors
            </h1>
          </div>

          <div className="flex items-start gap-11 flex-col lg:flex-row">
            <div className="w-full overflow-x-auto shadow-lg">
              <DataGrid
                disableColumnMenu
                rows={rows}
                columns={columns}
                pageSize={10}
                autoHeight
                pagination
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>

            <div className="w-full overflow-x-auto shadow-lg lg:w-1/3">
              <DataGrid
                disableColumnMenu
                rows={VerificationCodesRow}
                columns={VerificationCodes}
                pageSize={10}
                autoHeight
                pagination
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Verification Modal */}
      <VerificationModal
        open={open}
        handleClose={() => setOpen(false)}
        handleVerificationSuccess={handleVerificationSuccess}
        selectedRow={selectedRow}
      />
    </>
  );
}
