import React from 'react';
import { Grid, TextField, GridProps, TextFieldProps } from '@mui/material';
import moment from 'moment';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import MomentAdapter from '@date-io/moment';

export interface Props extends GridProps {
    gridItem?: boolean;
    value: moment.Moment | null;
    setValue: (newValue: moment.Moment | null) => void;
    touched?: boolean; 
    errors?: string; 
    isRequired?: boolean;
    isFullWidth?: boolean;
    label: string;
    isLoading?: boolean;
    error?: any;
    color?: TextFieldProps["color"];
}


const FormikTimePicker = ({
    gridItem,
    value,
    setValue,
    touched,
    errors,
    isRequired,
    label,
    isFullWidth,
    isLoading,
    error,
    color,
    ...gridProps
}: Props) => {
    const content = <>
        <LocalizationProvider dateAdapter={MomentAdapter}>
            <TimePicker
                value={value}
                label={label}
                onChange={(v) => setValue(v)}
                disabled={isLoading || Boolean(error)}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => 
                <TextField 
                    {...params} 
                    error={touched && errors !== undefined}
                    helperText={touched && errors}
                    required={isRequired}
                    label={isLoading? "Loading...": Boolean(error) ? `Error loading ${label} data.`: label}
                    fullWidth={isFullWidth}
                    color={color}
                />}
            />
        </LocalizationProvider>
    </>;
  return (
    gridItem?
    <Grid
        item={true}
        {...gridProps}
    >   
        {content}
    </Grid>:
    content
  )
}

export default FormikTimePicker;