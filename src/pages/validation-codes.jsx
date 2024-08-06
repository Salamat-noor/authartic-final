import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useGetAvailableCodesQuery, useGetUsedValidationCodesQuery, useGetAllValidationCodesQuery } from '@/slices/validationCodeApiSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/footer';

const options = [
  "Available Codes",
  "Used Codes",
  "All Codes",
];

const ITEM_HEIGHT = 48;

const ValidationCodesGrid = () => {
  const { data: availableCodes, error: availableCodesError } = useGetAvailableCodesQuery();
  const { data: usedCodes, error: usedCodesError } = useGetUsedValidationCodesQuery();
  const { data: allValidCodes, error: allValidCodesError } = useGetAllValidationCodesQuery();

  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // Add state for selected option
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    setSelectedOption(option);

    if (option === "Available Codes") {
      if (availableCodes && availableCodes.data) {
        const newRows = availableCodes.data.map(codes => ({
          id: codes.id,
          code: codes.code,
        }));
        setRows(newRows);
      }
    } else if (option === "Used Codes") {
      if (usedCodes && usedCodes.data) {
        const newRows = usedCodes.data.map(codes => ({
          id: codes.id,
          code: codes.code,
        }));
        setRows(newRows);
      }
    } else if (option === "All Codes") {
      if (allValidCodes && allValidCodes.data) {
        const newRows = allValidCodes.data.map(codes => ({
          id: codes.id,
          code: codes.code,
        }));
        setRows(newRows);
      }
    }
  };

  // Define columns
  const columns = [
    {
      field: 'code',
      headerName: 'Validation Codes',
      width: 250,
      headerClassName: 'bg-blue-500 text-white font-bold', // Tailwind classes for header
    },
  ];

  useEffect(() => {
    if (availableCodes && availableCodes.data) {
      // Map the codes to rows
      const newRows = availableCodes.data.map(codes => ({
        id: codes.id,
        code: codes.code,
      }));
      // Update the rows state with the new data
      setRows(newRows);
      console.log(availableCodes)
    }
  }, [availableCodes]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100vh" }}>
      <Box>
        <Header />
        <Box sx={{ height: 400, width: '70%', margin: "50px auto" }}>
          {/* Add IconButton outside of DataGrid */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", mb: 2 }}>
            <Typography
              variant="h6"
              component="h6"
              align="left"
              noWrap
              color="primary"
              gutterBottom>
              Validation Codes
            </Typography>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose(null)}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === selectedOption}
                  onClick={() => handleClose(option)} // Pass the option to handleClose
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <DataGrid
            disableColumnMenu
            disableColumnSorting
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ValidationCodesGrid;
