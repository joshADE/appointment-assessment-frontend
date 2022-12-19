import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Grid, Button, CircularProgress, useTheme } from '@mui/material';
import { useAddGuestMutation } from '../../services/api/guest/guest';
import { AddGuestRequest } from '../../services/types/guest/guest';
import { ContentProps } from '../common/ReusableDialog';
import FormikTextField from '../common/FormikTextField';

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
}

const phoneRegExp = /^[0-9()-]+$/g;

const validationScehema = yup.object({
    firstName: yup.string().max(25, 'First Name cannot be more than 25 characters').required('First Name is required'),
    lastName: yup.string().max(25, 'Last Name cannot be more than 25 characters').required('Last Name is required'),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone Number is not valid')
        .required('Phone Number is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
});

interface Props extends ContentProps {

}

const AddGuest = ({ setOpen }: Props) => {
    const [addGuest, { isLoading: isAdding }] = useAddGuestMutation();
    const theme = useTheme();

  return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationScehema}
            onSubmit={async (values, actions) => {
                const { firstName, lastName, phone, email } = values;
                const guest : AddGuestRequest = {
                    firstName,
                    lastName,
                    phone,
                    email,
                }
                try {
                    const data = await addGuest(guest).unwrap();
                    if (data.status){
                        alert("Item successfully added.");
                        actions.resetForm();
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
            {({ handleSubmit, handleReset, touched, errors }) => 
            
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
                        <FormikTextField 
                            name="firstName"
                            label="First Name"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                        />
                        <FormikTextField 
                            name="lastName"
                            label="Last Name"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                        />
                        <FormikTextField 
                            name="phone"
                            label="Phone Number"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                        />
                        <FormikTextField 
                            name="email"
                            label="Email"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
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

export default AddGuest