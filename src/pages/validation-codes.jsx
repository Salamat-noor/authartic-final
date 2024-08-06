import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useGetValidationCodeDetailsQuery, useCreateValidationCodeMutation } from '@/slices/validationCodeApiSlice';
import { Box, Typography, Button, TextField, Modal } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';

const options = [
  { name: 'Used codes', isUsed: true },
  { name: 'Available codes', isUsed: false },
  { name: 'Add Codes' }
];

const columns = [
  { field: 'id', headerName: 'ID', width: 100, headerClassName: 'bg-[#22477F] text-slate-100 text-md md:text-lg' },
  { field: 'is_used', headerName: 'is_used', width: 115, headerClassName: 'bg-[#22477F] text-slate-100 text-md md:text-lg' },
  { field: 'code', headerName: 'Code', width: 200, headerClassName: 'bg-[#22477F] text-slate-100 font-bold text-md md:text-lg' },
];

const ITEM_HEIGHT = 48;

export default function PaginatedTable() {
  const [tableRows, setTableRows] = useState([]);
  const [page, setPage] = useState(1);
  const [isUsed, setIsUsed] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [toggleModel, setToggleModel] = useState(false);
  const [numberOfCodes, setNumberOfCodes] = useState(''); // State to hold the input value
  const [createValidationCode, { isLoading: isCreateValidationLoading, error: isCreateValidationError }] = useCreateValidationCodeMutation();
  const { data, isLoading, error, refetch } = useGetValidationCodeDetailsQuery({
    page,
    limit: pageSize,
    isUsed
  });

  useEffect(() => {
    refetch();
    if (data && !error) {
      setTableRows(data?.data || []);
    } else if (error) {
      setTableRows([{ id: 1, name: error?.data?.message }]);
    }
  }, [data, page, isUsed, refetch, error]);

  const rows = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const [openClose3DotsMenu, setOpenClose3DotsMenu] = useState(null);
  const open = Boolean(openClose3DotsMenu);

  const handleThreeDotsClick = (event) => {
    setOpenClose3DotsMenu(event.currentTarget);
  };

  const handleClose = (isused) => {
    setOpenClose3DotsMenu(null);
    setIsUsed(isused);
  };

  const [handleModelOpen, setHandleModelOpen] = useState(false);

  const handleModalOpen = () => setHandleModelOpen(true);
  const handleModalClose = () => {
    setHandleModelOpen(false);
    setNumberOfCodes(''); // Clear input field when closing modal
  };

  const submitHandler = async () => {
    try {
      // Ensure numberOfCodes is valid
      if (numberOfCodes && !isNaN(numberOfCodes)) {
        const res = await createValidationCode(Number(numberOfCodes)); // Adjust API payload as needed
        toast.success('Validation codes created successfully!');
        refetch();
      } else {
        toast.error('Please enter a valid number.');
      }
    } catch (error) {
      toast.error('An error occurred while creating validation codes.');
    }
    handleModalClose(); // Close the modal after submission
  };

  return (
    <div className='w-screen min-h-screen flex flex-col justify-between'>
      <Box sx={{ width: "100%", height: "auto" }}>
        <Header />
        <div className='w-full md:w-[90%] lg:w-[70%] mx-auto mt-3'>
          <Box sx={{ mb: "2rem" }}>
            <Link href={'/admin-dashboard'} className='flex items-center justify-start gap-1'>
              <ArrowBack color='primary' />
              <Typography variant='h6' color={'primary'} className='text-sm sm:text-base md:text-lg'>
                Admin Dashboard
              </Typography>
            </Link>
          </Box>

          <Box sx={{ width: "100%", height: "auto", display: "flex", alignItems: 'center', justifyContent: "space-between" }}>
            <Typography variant='h5' color={'primary'} marginBottom={1}>
              {isUsed ? 'Used Codes' : 'Available Codes'}
            </Typography>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleThreeDotsClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={openClose3DotsMenu}
                open={open}
                onClose={() => setOpenClose3DotsMenu(null)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {options.map((option, index) => (
                  <MenuItem key={index} selected={option.isUsed === isUsed} onClick={() => { handleClose(option.isUsed); if (option.name === "Add Codes") handleModalOpen(); }}>
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Box>

          <Box sx={{ width: '100%', height: "450px", overflow: 'scroll' }}>
            {isLoading && <Typography variant='h5' color={"primary"}>Loading...</Typography>}
            {error && <Typography variant="h5" color={"error"}>{error?.message || error?.data?.message || 'An error occurred'}</Typography>}

            <DataGrid
              disableColumnFilter
              disableColumnMenu
              rows={tableRows}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[pageSize]}
              pagination
              paginationMode="server"
              rowCount={data?.totalCount || 0}
              paginationModel={{
                page: page - 1,
                pageSize,
              }}
              onPaginationModelChange={({ page }) => setPage(page + 1)}
            />
          </Box>
        </div>
      </Box>
      <Modal
        open={handleModelOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
              <Typography id="modal-title" variant="h6" component="h2">
                Creating Validation Code
              </Typography>
              <Typography id="modal-description" className="mt-2">
                Please enter the number of validation codes to generate
              </Typography>
              <TextField
                label="Number of Validation Codes"
                variant="outlined"
                fullWidth
                type="number"
                value={numberOfCodes}
                onChange={(e) => setNumberOfCodes(e.target.value)}
                className="mt-4"
              />
              <Button
                onClick={submitHandler}
                variant="contained"
                color="primary"
                className="mt-4"
              >
                Create
              </Button>
              <Button
                onClick={handleModalClose}
                className="mt-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Footer />
    </div>
  );
}
