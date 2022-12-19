import React from 'react';
import { Typography, Box, useTheme, Grid } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { useGetStaffsQuery } from '../../services/api/staff/staff';
import { Staff } from '../../services/types/staff/staff';
import ListContainer from '../common/ListContainer';
import AddStaff from './AddStaff';

const renderStaffDetails = ({ firstName, lastName, jobTitle }: Staff) => {
    const theme = useTheme();
    return (
        <div>
            <Typography component="p" variant="body1">{firstName} {lastName}</Typography>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><Circle sx={{ fontSize: "5px", marginRight: '5px', marginBottom: "2px" }} color={'action'} /></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{jobTitle}</Typography></Grid>
            </Grid>
        </div>
    );
}

const StaffList = () => {
    const { data, error, isFetching, isLoading } = useGetStaffsQuery();


  return (
    <Box>
        <ListContainer 
            title='Staffs'
            items={data?.data}
            renderItemContent={renderStaffDetails}
            isLoading={isLoading}
            error={data?.status === false ? {} : error}
            addItemDialogContent={AddStaff}
            addItemDialogTitle="Add Staff"
        />
    </Box>
  )
}

export default StaffList;