import React from 'react';
import { Grid, useTheme, Box } from '@mui/material';
import GuestList from '../guest/GuestList';
import StaffList from '../staff/StaffList';
import ServiceList from '../service/ServiceList';
import AppointmentList from '../appointment/AppointmentList';

const MainPage = () => {
  const theme = useTheme();
  return (
    <Box
      style={{ backgroundColor: theme.palette.grey.A200, minHeight: '100vh' }}
    >
      <Grid
        container={true}
        direction="row"
        justifyContent={"center"}
        padding={"10px"}
      >
        <Grid
          item={true}
          xs={2}
          marginX="5px"
        >
          <GuestList />
        </Grid>
        <Grid
          item={true}
          xs={2}
          marginX="5px"
        >
          <StaffList />
        </Grid>
        <Grid
          item={true}
          xs={2}
          marginX="5px"
        >
          <ServiceList />
        </Grid>
        <Grid
          item={true}
          xs={true}
          marginX="5px"
        >
          <AppointmentList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainPage;