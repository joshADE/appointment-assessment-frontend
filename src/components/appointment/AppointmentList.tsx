import React, { useState, useMemo } from 'react';
import { Typography, Box, useTheme, Grid } from '@mui/material';
import { Person2Outlined, SpaOutlined, TimerOutlined } from '@mui/icons-material';
import { useGetAppointmentsQuery } from '../../services/api/appointment/appointment';
import { useGetGuestsQuery } from '../../services/api/guest/guest';
import { useGetStaffsQuery } from '../../services/api/staff/staff';
import { useGetServicesQuery } from '../../services/api/service/service';
import { Appointment } from '../../services/types/appointment/appointment';
import ListContainer from '../common/ListContainer';
import AddAppointment from './AddAppointment';
import { AuditableBaseEntity } from '../../services/types/common/entity';
import { Response } from '../../services/types/common/result';
import { Guest } from '../../services/types/guest/guest';
import { Service } from '../../services/types/service/service';
import { Staff } from '../../services/types/staff/staff';
import moment from 'moment';
import FormikDatePicker from '../common/FormikDatePicker';

const createMapEntityResult : <T extends AuditableBaseEntity>( data :{ data?: Response<T[]> }) => {[id: string]: T} | undefined
= ({ data }) => data?.data ? Object.fromEntries(data.data.map(e => ([e.id, e]))) : undefined;

type AppointmentMappingType = {
    guestsMap: ReturnType<typeof createMapEntityResult<Guest>>;
    servicesMap: ReturnType<typeof createMapEntityResult<Service>>;
    staffsMap: ReturnType<typeof createMapEntityResult<Staff>>;
}


const renderAppointmentDetails = (mappingData: AppointmentMappingType) => ({ guestId, staffId, serviceId, startTime, endTime }: Appointment) => {
    const theme = useTheme();
    const guest = mappingData?.guestsMap ? mappingData.guestsMap[String(guestId)] : null;
    const service = mappingData?.servicesMap ? mappingData.servicesMap[String(serviceId)] : null;
    const staff = mappingData?.staffsMap ? mappingData.staffsMap[String(staffId)] : null;

    const startTimeString = moment(startTime).format("LT");
    const endTimeString = moment(endTime).format("LT");

    return (
        <div>
            <Typography component="p" variant="body1">{guest ? `${guest.firstName} ${guest.lastName}` : "Guest Error"}</Typography>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><TimerOutlined sx={{ fontSize: theme.icon.md, marginRight: '5px' }} color={'action'}/></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{startTimeString} - {endTimeString}</Typography></Grid>
            </Grid>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><SpaOutlined sx={{ fontSize: theme.icon.md, marginRight: '5px' }} color={'action'}/></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{service ? service.name : "Service Error"}</Typography></Grid>
            </Grid>
            <Grid
                container={true}
                alignItems="center"
            >
                <Grid item={true}><Person2Outlined sx={{ fontSize: theme.icon.md, marginRight: '5px' }} color={'action'}/></Grid>
                <Grid item={true}><Typography component="p" variant="body2">{staff ? `${staff.firstName} ${staff.lastName}` : "Staff Error"}</Typography></Grid>
            </Grid>
        </div>
    );
}

const AppointmentList = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

    const { data, error, isFetching, isLoading } = useGetAppointmentsQuery();
    const { map: guestsMap, error: guestsError, isFetching: fetchingGuests, isLoading: loadingGuests } = useGetGuestsQuery(undefined,{
        selectFromResult: (data) => ({ map : createMapEntityResult(data), error: data.error, isFetching: isFetching, isLoading: data.isLoading }),
    });
    const { map: staffsMap, error: staffsError, isFetching: fethingStaffs, isLoading: loadingStaffs } = useGetStaffsQuery(undefined,{
        selectFromResult: (data) => ({ map : createMapEntityResult(data), error: data.error, isFetching: isFetching, isLoading: data.isLoading }),
    });
    const { map: servicesMap, error: servicesError, isFetching: fethingServices, isLoading: loadingServices } = useGetServicesQuery(undefined,{
        selectFromResult: (data) => ({ map : createMapEntityResult(data), error: data.error, isFetching: isFetching, isLoading: data.isLoading }),
    });

    const availableDates = useMemo(() => {
        return data?.data?.map(app => moment(app.startTime));
    }, [data])

    const filteredAppointments = useMemo(() => {
        return  selectedDate !== null ? data?.data?.filter(app => moment(app.startTime).isSame(selectedDate, "date")) : [];
    }, [selectedDate, data]);


  return (
    <Box>
        <ListContainer 
            title='Appointments'
            items={filteredAppointments}
            renderItemContent={renderAppointmentDetails({ guestsMap, staffsMap, servicesMap })}
            isLoading={isLoading || loadingGuests || loadingStaffs || loadingServices}
            error={data?.status === false ? {} : error || guestsError || staffsError || servicesError}
            addItemDialogContent={AddAppointment}
            addItemDialogTitle="Add Appointment"
            topContent={<FormikDatePicker 
                value={selectedDate}
                setValue={setSelectedDate}
                label="Select Date"
                isLoading={isLoading}
                isRequired
                shouldDisableDate={(newDate) => newDate === null || (availableDates !== undefined && !availableDates.find(d => newDate.isSame(d, "date")))}
                isFullWidth
                gridItem
                color="secondary"
                marginY="4px"
                minWidth="100%"
                maxHeight="35px"
            />}
        />
    </Box>
  )
}

export default AppointmentList