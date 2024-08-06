import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DataGrid } from "@mui/x-data-grid";
import { useGetValidationCodeDetailsQuery } from "@/slices/validationCodeApiSlice";
import { useGetAllVendorsByAdminQuery, useVerifyVendorByAdminMutation } from "@/slices/adminApliSlices";
import VerificationModal from "@/components/VerificationModal";
import Head from "next/head";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
  {
    name: "Verified users",
    is_verified: true,
  },
  {
    name: "Unverified users",
    is_verified: false,
  }

];

const ITEM_HEIGHT = 48;

export default function UsersTable() {
  const [vendorId, setVendorId] = useState(null);
  const [IsVerifiedVendors, setIsVerifiedVendors] = useState(true);

  const [vendorPage, setVendorPage] = useState(1);
  const [vendorPageSize, setVendorPageSize] = useState(10);

  const [codePage, setCodePage] = useState(1);
  const [codePageSize, setCodePageSize] = useState(10);

  const [verifyVendor, { isLoading, error }] = useVerifyVendorByAdminMutation();
  const { data: allVendors, isLoading: isAllVendorsLoading, error: allVendorsError, refetch: fetchVendorsAgain } = useGetAllVendorsByAdminQuery({
    page: vendorPage,
    limit: vendorPageSize,
    is_verified: IsVerifiedVendors
  });

  const { data: allCodes, refetch: fetchAllCodes } = useGetValidationCodeDetailsQuery({
    page: codePage,
    limit: codePageSize,
    isUsed: false
  });

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  //  PAGE TABLE CONTENT
  const vendorColumns = [
    { field: "id", headerName: "ID", width: 70, headerClassName: 'bg-[#22477F] text-slate-100 text-md' },
    { field: "vendor_name", headerName: "User name", width: 150, headerClassName: 'bg-[#22477F] text-slate-100 text-md' },
    { field: "email", headerName: "Email", width: 220, headerClassName: 'bg-[#22477F] text-slate-100 text-md' },
    { field: "country", headerName: "Country", width: 150, headerClassName: 'bg-[#22477F] text-slate-100 text-md' },
    {
      field: "verified",
      headerName: "Verified",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params?.row?.validation_code ? (
            <DoneIcon style={{ color: "green" }} />
          ) : (
            <CloseIcon style={{ color: "red" }} />
          )}
        </div>
      ),
      headerClassName: 'bg-[#22477F] text-slate-100 text-md'
    },
    {
      field: "verificationCode",
      headerName: "Verification Code",
      width: 250,
      renderCell: (params) =>
        params?.row?.validation_code ? (
          params?.row?.validation_code
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
                setOpen(true); // Open the modal
                setVendorId(params.id);
              }}
            />
          </div>
        ),
      headerClassName: 'bg-[#22477F] text-slate-100 text-md'
    },
  ];
  const VerificationCodesColumns = [
    { field: "code", headerName: "Available Codes", width: 300, headerClassName: 'bg-[#22477F] text-slate-100 text-md' },
  ];
  const VerificationCodesRow = allCodes?.data?.map((codes) => ({
    id: codes.id,
    code: codes.code,
  }));
  //  PAGE TABLE CONTENT

  const handleVerificationSuccess = (code) => {
    // Update the row data based on verification success
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.verificationCode === code ? { ...row, verified: true } : row
      )
    );
  };

  // ThreeDots MENU STATES
  const [isOpenVendors3DotsMenu, setIsOpenVendors3DotsMennu] = useState(null);
  const open3DotsMenu = Boolean(isOpenVendors3DotsMenu);

  const handle3DotsClick = (event) => {
    setIsOpenVendors3DotsMennu(event.currentTarget);
  };

  const handle3DotsClose = (toggleVerifiedAndunverified) => {
    setIsVerifiedVendors(toggleVerifiedAndunverified)
    setIsOpenVendors3DotsMennu(null);
  };


  useEffect(() => {
    if (allVendors) {
      setRows(allVendors?.data);
    }
  }, [allVendors, error, fetchVendorsAgain]);

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

          <div className="flex items-start lg:items-end gap-11 flex-col lg:flex-row">
            <div className="w-full h-auto overflow-x-auto">
              <div className="text-left w-full mb-4 flex items-center justify-between">
                <h1 className="font-Poppins font-semibold text-1xl md:text-[27px] xl:text-2xl">
                  Vendors
                </h1>
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open3DotsMenu ? 'long-menu' : undefined}
                    aria-expanded={open3DotsMenu ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handle3DotsClick}
                    color="primary"
                  >
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={isOpenVendors3DotsMenu}
                    open={open3DotsMenu}
                    onClose={handle3DotsClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}
                  >
                    {options?.map((option) => (
                      <MenuItem
                        key={option.name}
                        selected={option.name === 'Verified users'}
                        onClick={() => handle3DotsClose(option.is_verified)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <div className="w-full h-[450px] overflow-x-auto shadow-lg">
                <DataGrid
                  disableColumnMenu
                  rows={rows}
                  columns={vendorColumns}
                  pageSize={vendorPageSize}
                  pagination
                  paginationMode="server"
                  rowCount={allVendors?.totalCount || 0}
                  paginationModel={{
                    page: vendorPage - 1,
                    pageSize: vendorPageSize,
                  }}
                  onPaginationModelChange={({ page, pageSize }) => {
                    setVendorPage(page + 1);
                    setVendorPageSize(pageSize);
                  }}
                />
              </div>
            </div>

            <div className="w-full h-[450px] overflow-x-auto shadow-lg lg:w-1/3">
              <DataGrid
                disableColumnMenu
                rows={VerificationCodesRow}
                columns={VerificationCodesColumns}
                pageSize={codePageSize}
                pagination
                paginationMode="server"
                rowCount={allCodes?.totalCount || 0}
                paginationModel={{
                  page: codePage - 1,
                  pageSize: codePageSize,
                }}
                onPaginationModelChange={({ page, pageSize }) => {
                  setCodePage(page + 1);
                  setCodePageSize(pageSize);
                }}
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
        verifyVendorFunc={verifyVendor}
        vendorId={vendorId}
        fetchVendorsAgain={fetchVendorsAgain}
      />
    </>
  );
}
