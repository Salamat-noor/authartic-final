import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useFindAllCountriesQuery } from '@/slices/activeCountryApiSlice';
import { Box, Typography } from '@mui/material';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const options = [
    { name: 'Active Countries', isActive: true },
    { name: 'Inactive Countries', isActive: false }
];

const columns = [
    { field: 'id', headerName: 'ID', width: 100, headerClassName: 'bg-blue-500 text-slate-100 text-md md:text-lg' },
    { field: 'code', headerName: 'Code', width: 150, headerClassName: 'bg-blue-500 text-slate-100 text-md md:text-lg' },
    { field: 'name', headerName: 'Country', width: 200, headerClassName: 'bg-blue-500 text-slate-100 font-bold text-md md:text-lg' },
];

const ITEM_HEIGHT = 48;

export default function PaginatedTable() {
    const [tableRows, setTableRows] = useState([]);
    const [page, setPage] = useState(1);
    const [isActiveCountry, setIsActiveCountry] = useState(false); // Default value
    const [pageSize, setPageSize] = useState(10); // Default value

    const { data, isLoading, error, refetch } = useFindAllCountriesQuery({
        page,
        limit: pageSize,
        isActiveCountry
    }); // Force the query to run


    useEffect(() => {
        // Refetch data when page or filter changes
        refetch();
        if (data && !error) {
            setTableRows(data?.data || [])
        }
        else if (error) {
            setTableRows([{ id: 1, name: error?.data?.message }])
        }
    }, [data, page, isActiveCountry, refetch]);


    const rows = data?.data || [];
    const totalPages = data?.totalPages || 1;

    // THREE DOTS MENU STATES
    const [openClose3DotsMenu, setOpenClose3DotsMenu] = useState(null);
    const open = Boolean(openClose3DotsMenu);

    const handleThreeDotsClick = (event) => {
        setOpenClose3DotsMenu(event.currentTarget);
    };

    const handleClose = (isactive) => {
        setOpenClose3DotsMenu(null);
        setIsActiveCountry(isactive);
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
                            {isActiveCountry ? 'Active Countries' : 'Disabled Countries'}
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
                                    <MenuItem key={index} selected={option.name === 'Active Countries'} onClick={() => handleClose(option.isActive)}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </Box>

                    <Box sx={{ width: '100%', height: "450px", overflow: 'scroll' }}>
                        {isLoading && <Typography variant='h5' color={"primary"}>Loading...</Typography>}
                        {/* {errosr && <Typography variant="h5" color={"error"}>{error?.message || error?.data?.message || error?.error}</Typography>} */}

                        < DataGrid
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
            <Footer />
        </div>
    );
}
