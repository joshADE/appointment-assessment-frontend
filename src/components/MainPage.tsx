import { Grid, useTheme, Box } from '@mui/material';
import React from 'react';
import GuestList from './GuestList';

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
          <GuestList />
        </Grid>
        <Grid
          item={true}
          xs={3}
          marginX="5px"
        >
          <GuestList />
        </Grid>
        <Grid
          item={true}
          xs={true}
          marginX="5px"
        >
          <GuestList />
        </Grid>
      </Grid>
    </Box>
  )
}

export default MainPage;