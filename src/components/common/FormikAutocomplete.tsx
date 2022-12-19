import React from 'react';
import { Grid, TextField, GridProps, Autocomplete, TextFieldProps } from '@mui/material';
import { AuditableBaseEntity } from '../../services/types/common/entity';

export type OptionType<T extends AuditableBaseEntity> = { label: string; value: T };
export interface Props<T extends AuditableBaseEntity, O extends OptionType<T>> extends GridProps {
    gridItem?: boolean;
    value: O | null;
    setValue: (newValue: O | null) => void;
    touched?: boolean; 
    errors?: string; 
    isRequired?: boolean;
    isFullWidth?: boolean;
    label: string;
    options: O[];
    isLoading?: boolean;
    error?: any;
    color?: TextFieldProps["color"];
}


const FormikAutocomplete: <T extends AuditableBaseEntity, O extends OptionType<T>>(props: Props<T, O>) => JSX.Element = ({
    gridItem,
    value,
    setValue,
    touched,
    errors,
    isRequired,
    label,
    isFullWidth,
    options,
    isLoading,
    error,
    color,
    ...gridProps
}) => {
    const content = <>
            <Autocomplete
                options={options}
                getOptionLabel={option => option.label}
                value={value}
                onChange={(e, v) => setValue(v)}
                disabled={isLoading || Boolean(error)}
                // inputValue={value?.label ?? "Not Selected"}
                // onInputChange={(e, v) => {}}
                isOptionEqualToValue={(opt, val) => { return String(opt.value.id) === String(val.value.id); }}
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

export default FormikAutocomplete;