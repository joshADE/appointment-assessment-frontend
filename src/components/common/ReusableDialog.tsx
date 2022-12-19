import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import React from 'react';

export interface ContentProps {
    setOpen: (val: boolean) => void;
    open?: boolean;
}

export interface Props {
    title?: string;
    content?: (props: ContentProps) => JSX.Element;
    open: boolean;
    setOpen: (val: boolean) => void;
}

const ReusableDialog = ({ title, content, open, setOpen}: Props) => {


    const handleClose = () => {
        setOpen(false);
    }
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
    >
        <DialogTitle>
            {title ?? "Add Item"}
        </DialogTitle>
        <DialogContent>
            {content ? content({ setOpen, open }) : <Typography>No content</Typography>}
        </DialogContent>
    </Dialog>
  )
}

export default ReusableDialog;