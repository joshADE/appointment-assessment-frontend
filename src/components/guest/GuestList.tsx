import React from 'react';
import { Typography, Box, useTheme, Grid } from '@mui/material';
import { PhoneOutlined, EmailOutlined } from '@mui/icons-material';
import { useGetGuestsQuery } from '../../services/api/guest/guest';
import { Guest } from '../../services/types/guest/guest';
import ListContainer from '../common/ListContainer';
import AddGuest from './AddGuest';

const renderGuestDetails = ({ firstName, lastName, phone, email }: Guest) => {
    const theme = useTheme();
    return (
        <div>
            <Typography component="p" variant="body1">{firstName} {lastName}</Typography>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><PhoneOutlined sx={{ fontSize: theme.icon.md, marginRight: '5px' }} color={'action'}/></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{phone}</Typography></Grid>
            </Grid>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><EmailOutlined sx={{ fontSize: theme.icon.md, marginRight: '5px' }} color={'action'}/></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{email}</Typography></Grid>
            </Grid>
        </div>
    );
}

const GuestList = () => {
    const { data, error, isFetching, isLoading } = useGetGuestsQuery();


  return (
    <Box>
        <ListContainer 
            title='Guests'
            items={data?.data}
            renderItemContent={renderGuestDetails}
            isLoading={isLoading}
            error={data?.status === false ? {} : error}
            addItemDialogContent={AddGuest}
            addItemDialogTitle="Add Guest"
        />
    </Box>
  )
}

export default GuestList