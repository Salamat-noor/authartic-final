import React, { useRef } from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DataGrid } from "@mui/x-data-grid";

export default function UsersTable() {
  const modalRef = useRef(null);
  const [isVerified, setIsVerified] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditNoteClick = (row) => {
    handleOpen(); // Open the modal when EditNoteIcon is clicked
  };

  const columns = [
    { field: "fullName", headerName: "User name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "verified",
      headerName: "Verified",
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {params.value ? (
              <DoneIcon style={{ color: "green" }} />
            ) : (
              <CloseIcon style={{ color: "red" }} />
            )}
          </div>
        );
      },
    },
    {
      field: "verificationCode",
      headerName: "Verification_Code",
      width: 250,
      renderCell: (params) =>
        params.row.verificationCode ? (
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
              onClick={() => handleEditNoteClick(params.row)}
            />
          </div>
        ),
    },
  ];

  const rows = [
    {
      id: 1,
      fullName: "Jon",
      email: "jon@gmail.com",
      verified: true,
      verificationCode: 9870,
    },
    {
      id: 2,
      fullName: "Cersei",
      email: "jon@gmail.com",
      verified: false,
      verificationCode: null,
    },
    {
      id: 3,
      fullName: "Jaime",
      email: "jon@gmail.com",
      verified: false,
      verificationCode: null,
    },
    {
      id: 4,
      fullName: "Arya",
      email: "jon@gmail.com",
      verified: false,
      verificationCode: null,
    },
    {
      id: 5,
      fullName: "Daenerys",
      email: "jon@gmail.com",
      verified: false,
      verificationCode: null,
    },
  ];
  const VerificationCodes = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "availableCodes", headerName: "Available Codes", width: 250 },
  ];
  const VerificationCodesRow = [
    {
      id: 1,
      availableCodes: 9087,
    },
    {
      id: 2,
      availableCodes: 9087,
    },
    {
      id: 3,
      availableCodes: 9087,
    },
    {
      id: 4,
      availableCodes: 9087,
    },
    {
      id: 5,
      availableCodes: 9087,
    },
    {
      id: 6,
      availableCodes: 9087,
    },
    {
      id: 7,
      availableCodes: 9087,
    },
    {
      id: 8,
      availableCodes: 9087,
    },
    {
      id: 9,
      availableCodes: 9087,
    },
    {
      id: 10,
      availableCodes: 9087,
    },
  ];

  React.useEffect(() => {
    setIsVerified(rows.filter((data) => data.verified));
  }, []);

  return (
    <>
      <Head>
        <title>Vendors</title>
      </Head>

      <div className="w-full min-h-screen flex flex-col justify-between">
        <Header />

        <div className="w-full  h-full mx-auto mb-7 px-2 md:px-7">
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

      {/* MODAL */}
      <div className="items-center justify-center h-auto hidden">
        <Button onClick={handleOpen} ref={modalRef}>
          Open modal
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  False Verification
                </Typography>
                <Typography id="modal-modal-description" className="mt-2">
                  Click this link to verify yourself{" "}
                  <Link href={"/"} className="text-blue-700">
                    Verify
                  </Link>
                </Typography>
                <Button onClick={handleClose} className="mt-4">
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
