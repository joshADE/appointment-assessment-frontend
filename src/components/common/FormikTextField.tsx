import React from 'react';
import { Grid, TextField, GridProps, TextFieldProps } from '@mui/material';
import { Field } from 'formik';


interface Props<T extends Record<string, any>, K extends keyof T> extends GridProps {
    gridItem?: boolean;
    name: K;
    touched: Partial<Record<K, boolean>>; 
    errors: Partial<Record<K, string>>; 
    isRequired?: boolean;
    isFullWidth?: boolean;
    label: string;
    type?: TextFieldProps["type"];
}

const FormikTextField: <T extends Record<string, any>, K extends keyof T>(props: Props<T, K>) => JSX.Element = ({
    gridItem,
    name,
    touched,
    errors,
    isRequired,
    label,
    isFullWidth,
    type,
    ...gridProps
}) => {
    const content = <>
        <Field 
            name={name}
            as={TextField}
            error={touched[name] && errors[name] !== undefined}
            helperText={touched[name] && errors[name]}
            required={isRequired}
            label={label}
            fullWidth={isFullWidth}
            type={type}
        />
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

export default FormikTextField