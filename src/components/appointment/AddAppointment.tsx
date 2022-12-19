import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import moment from 'moment';
import { Formik } from 'formik';
import { Grid, Button, CircularProgress, useTheme } from '@mui/material';
import { useAddAppointmentMutation } from '../../services/api/appointment/appointment';
import { AddAppointmentRequest, AppointmentStatus } from '../../services/types/appointment/appointment';
import { ContentProps } from '../common/ReusableDialog';
import { useGetGuestsQuery } from '../../services/api/guest/guest';
import { useGetStaffsQuery } from '../../services/api/staff/staff';
import { useGetServicesQuery } from '../../services/api/service/service';
import { Guest } from '../../services/types/guest/guest';
import { Staff } from '../../services/types/staff/staff';
import { Service } from '../../services/types/service/service';
import FormikAutocomplete, { OptionType } from '../common/FormikAutocomplete';
import FormikDatePicker from '../common/FormikDatePicker';
import FormikTimePicker from '../common/FormikTimePicker';

const initialValues = {
    guestId: "-1",
    staffId: "-1",
    serviceId: "-1",
    date: "null",
    time: "null",
}



const validationScehema = yup.object({
    guestId: yup.string().not(["-1"], "Must select a guest."),
    staffId: yup.string().not(["-1"], "Must select a staff."),
    serviceId: yup.string().not(["-1"], "Must select a service."),
    date: yup.string().not(["null"], "Must select a date."),
    time: yup.string().not(["null"], "Must select a time."),
});

interface Props extends ContentProps {

}

const guestToOption : <T extends Guest>(entity: T) => OptionType<T> = (entity) => {
    return { label: entity.firstName + " " + entity.lastName, value: entity };
}

const staffToOption : <T extends Staff>(entity: T) => OptionType<T> = (entity) => {
    return { label: entity.firstName + " " + entity.lastName, value: entity };
}

const serviceToOption : <T extends Service>(entity: T) => OptionType<T> = (entity) => {
    return { label: entity.name, value: entity };
}



const AddAppointment = ({setOpen, open }: Props) => {
    const [addAppointment, { isLoading: isAdding }] = useAddAppointmentMutation();
    const { data: guests, error: guestsError, isFetching: fetchingGuests, isLoading: loadingGuests } = useGetGuestsQuery();
    const { data: staffs, error: staffsError, isFetching: fethingStaffs, isLoading: loadingStaffs } = useGetStaffsQuery();
    const { data: services, error: servicesError, isFetching: fethingServices, isLoading: loadingServices } = useGetServicesQuery();
    const theme = useTheme();
    const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [date, setDate] = useState<moment.Moment | null>(null);
    const [time, setTime] = useState<moment.Moment | null>(null);
    const [initial, setInitial] = useState(initialValues);

    useEffect(() => {
        if (open !== undefined){
            setTime(null);
            setDate(null);
            setInitial(initialValues);
        }
    }, [open])

  return (
    <div>
        <Formik
            initialValues={initial}
            enableReinitialize={true}
            validationSchema={validationScehema}
            onSubmit={async (values, actions) => {
                const { serviceId, staffId, guestId } = values;
                const dateTime = moment();
                // setting the date
                dateTime.set("date", date?.get("date") ?? 1);
                dateTime.set("month", date?.get("month") ?? 0);
                dateTime.set("year", date?.get("year") ?? 1970);
                // setting the time
                dateTime.set("millisecond", time?.get("millisecond") ?? 0);
                dateTime.set("second", time?.get("second") ?? 0);
                dateTime.set("minute", time?.get("minute") ?? 0);
                dateTime.set("hour", time?.get("hour") ?? 0);

                const currentHour = dateTime.get("hour");
                const currentMinute = dateTime.get("minute");

                // add 30 min for end time
                const dateTimeClone = dateTime.clone();
                let dateTimeClone30Min = dateTimeClone;
                
                if (currentHour === 23 && currentMinute + 30 > 59){
                    dateTimeClone30Min = dateTimeClone30Min.endOf("day");
                }else {
                    dateTimeClone30Min.set("minute", currentMinute + 30);
                }

                const appointment : AddAppointmentRequest = {
                    serviceId: Number(serviceId),
                    staffId: Number(staffId),
                    guestId: Number(guestId),
                    status: AppointmentStatus.PENDING,
                    endTime: dateTimeClone30Min.format(),
                    startTime: dateTime.format()
                }
                try {
                    const data = await addAppointment(appointment).unwrap();
                    if (data.status){
                        alert("Item successfully added.");
                        actions.resetForm();
                        setDate(null);
                        setTime(null);
                        setOpen(false);
                    }else{
                        throw new Error(data.message);
                    }
                }catch(err){
                    console.log(err)
                    const error: any = err;
                    if (error?.data?.message){
                        alert(error.data.message);
                    }else{
                        alert("Error: There was a problem in the adding the item: " + (err as Error).message);
                    }
                }

            }}
        >
            {({ handleSubmit, handleReset, touched, errors, handleChange, values }) => 
            
            <form
                onSubmit={handleSubmit}
                onReset={handleReset}
                noValidate
            >

                <Grid
                    container={true}
                    direction="column"
                    alignItems="stretch"
                    justifyContent="flex-start"
                >
                    <Grid
                        container={true}
                        item={true}
                        xs={true}
                        padding="5px"
                        justifySelf="stretch"
                        direction="column"
                        alignItems="center"
                    >
                        <FormikAutocomplete 
                            value={values.guestId === "-1" || !selectedGuest ? null : guestToOption(selectedGuest)}
                            setValue={(newGuest) => {
                                handleChange("guestId")(String(newGuest?.value?.id ?? -1));
                                setSelectedGuest(newGuest?.value ?? null)
                            }}
                            isLoading={loadingGuests}
                            error={!guests?.status || guestsError}
                            options={guests?.data ? guests.data.map(e => guestToOption(e)) : []}
                            label="Guest"
                            errors={errors.guestId}
                            touched={touched.guestId}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                            minWidth="350px"
                            color="secondary"
                        />
                        <FormikDatePicker
                            value={date}
                            setValue={(newDate) => { 
                                if (newDate === null){
                                    handleChange("date")("null");
                                }else{
                                    handleChange("date")(newDate.format("L"));
                                }
                                setDate(newDate);
                            }}
                            label="Date"
                            errors={errors.date}
                            touched={touched.date}
                            isRequired
                            isFullWidth
                            gridItem
                            color="secondary"
                            marginY="4px"
                            minWidth="350px"
                        />
                        <FormikTimePicker
                            value={time}
                            setValue={(newTime) => { 
                                if (newTime === null){
                                    handleChange("time")("null");
                                }else{
                                    handleChange("time")(newTime.format());
                                }
                                setTime(newTime);
                            }}
                            label="Time"
                            errors={errors.time}
                            touched={touched.time}
                            isRequired
                            isFullWidth
                            gridItem
                            color="secondary"
                            marginY="4px"
                            minWidth="350px"
                        />
                        <FormikAutocomplete 
                            value={values.serviceId === "-1" || !selectedService ? null : serviceToOption(selectedService)}
                            setValue={(newService) => {
                                handleChange("serviceId")(String(newService?.value?.id ?? -1));
                                setSelectedService(newService?.value ?? null)
                            }}
                            isLoading={loadingServices}
                            error={!services?.status || servicesError}
                            options={services?.data ? services.data.map(e => serviceToOption(e)) : []}
                            label="Service"
                            errors={errors.serviceId}
                            touched={touched.serviceId}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                            minWidth="350px"
                            color="secondary"
                        />
                        <FormikAutocomplete 
                            value={values.staffId === "-1" || !selectedStaff ? null : staffToOption(selectedStaff)}
                            setValue={(newStaff) => {
                                handleChange("staffId")(String(newStaff?.value?.id ?? -1));
                                setSelectedStaff(newStaff?.value ?? null)
                            }}
                            isLoading={loadingStaffs}
                            error={!staffs?.status || staffsError}
                            options={staffs?.data ? staffs.data.map(e => staffToOption(e)) : []}
                            label="Staff"
                            errors={errors.staffId}
                            touched={touched.staffId}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                            minWidth="350px"
                            color="secondary"
                        />
                    </Grid>
                    <Grid
                        item={true}
                        xs={true}
                        padding="5px"
                        alignSelf="flex-end"
                    >
                        <Button
                            disabled={isAdding}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            endIcon={isAdding ? 
                                <CircularProgress
                                    color="primary"
                                    sx={{ marginRight: '5px' }} 
                                    size={theme.icon.sm} 
                                /> : 
                                null
                            }
                        > 
                            Confirm
                        </Button>
                    </Grid>
            </Grid>
            </form>}
        </Formik>
        
    </div>
  )
}

export default AddAppointment;