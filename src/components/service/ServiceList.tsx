import React from 'react';
import { Typography, Box, useTheme, Grid } from '@mui/material';
import { Circle } from '@mui/icons-material';
import { useGetServicesQuery } from '../../services/api/service/service';
import { Service } from '../../services/types/service/service';
import ListContainer from '../common/ListContainer';
import AddService from './AddService';

const renderServiceDetails = ({ name, category, price }: Service) => {
    const theme = useTheme();
    return (
        <div>
            <Typography component="p" variant="body1">{name}</Typography>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><Circle sx={{ fontSize: "5px", marginRight: '5px', marginBottom: "2px" }} color={'action'} /></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{category}</Typography></Grid>
                <Grid item={true}><Circle sx={{ fontSize: "5px", marginLeft: "10px",marginRight: '5px', marginBottom: "2px" }} color={'action'} /></Grid>
                <Grid item={true}><Typography component="p" variant="body2">${price}</Typography></Grid>
            </Grid>
        </div>
    );
}

const ServiceList = () => {
    const { data, error, isFetching, isLoading } = useGetServicesQuery();


  return (
    <Box>
        <ListContainer 
            title='Services'
            items={data?.data}
            renderItemContent={renderServiceDetails}
            isLoading={isLoading}
            error={data?.status === false ? {} : error}
            addItemDialogContent={AddService}
            addItemDialogTitle="Add Service"
        />
    </Box>
  )
}

export default ServiceList;