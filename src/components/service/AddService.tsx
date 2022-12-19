import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Grid, Button, CircularProgress, useTheme } from '@mui/material';
import { useAddServiceMutation } from '../../services/api/service/service';
import { AddServiceRequest } from '../../services/types/service/service';
import { ContentProps } from '../common/ReusableDialog';
import FormikTextField from '../common/FormikTextField';

const initialValues = {
    name: '',
    category: '',
    price: '0'
}

const priceRegExp = /^[0-9]+$/g;

const validationScehema = yup.object({
    name: yup.string().max(25, 'Name cannot be more than 25 characters').required('Name is required'),
    category: yup.string().max(25, 'Category cannot be more than 25 characters').required('Category is required'),
    price: yup
        .string()
        .matches(priceRegExp, 'Price is not valid')
        .required('Price is required'),
});

interface Props extends ContentProps {

}

const AddService = ({ setOpen }: Props) => {
    const [addService, { isLoading: isAdding }] = useAddServiceMutation();
    const theme = useTheme();

  return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationScehema}
            onSubmit={async (values, actions) => {
                const { name, category, price } = values;
                const numberPrice = Number(price);
                const service : AddServiceRequest = {
                    name,
                    category,
                    price: isNaN(numberPrice) ? 0 : numberPrice,
                }
                try {
                    const data = await addService(service).unwrap();
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
                            name="name"
                            label="Name"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                        />
                        <FormikTextField 
                            name="category"
                            label="Category"
                            errors={errors}
                            touched={touched}
                            isRequired
                            isFullWidth
                            gridItem
                            marginY="4px"
                        />
                        <FormikTextField 
                            name="price"
                            label="Price"
                            type="number"
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

export default AddService;