import React, { useState } from 'react';
import { Grid, Button, Divider, Typography, Icon, Box, CircularProgress, useTheme } from '@mui/material';
import StyledPaper from '../../styledComponents/StyledPaper';
import { AuditableBaseEntity } from '../../services/types/common/entity';
import { Add, ErrorOutlineOutlined } from '@mui/icons-material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import ReusableDialog, { Props as ReusableDialogProps } from './ReusableDialog';
interface Props<T extends AuditableBaseEntity> {
    title: string;
    isLoading: boolean;
    items?: T[];
    renderItemContent:(item: T) => React.ReactNode;
    error?: FetchBaseQueryError | SerializedError; 
    addItemDialogContent?: ReusableDialogProps["content"];
    addItemDialogTitle?: string;
    topContent?: React.ReactNode;
}


const ListContainer: <T extends AuditableBaseEntity>(props: Props<T>) => JSX.Element = ({
    items,
    renderItemContent,
    title,
    isLoading,
    error,
    addItemDialogContent,
    addItemDialogTitle,
    topContent
}) => {
    const [addItemDialogOpen, setAddItemDialogOpen] = useState(false);
    const theme = useTheme();
  return (<>
    <StyledPaper
        borderRadius='md'
        elevation={1}
    >
        <Grid
            container={true}
            direction="column"
            alignItems="stretch"
            justifyContent="flex-start"
            minHeight="100%"
        >
            <Grid
                container={true}
                item={true}
                xs={true}
                direction="column"
                alignItems="stretch"
                justifyContent="flex-start"
                paddingX="10px"
                paddingY="2px"
                flexGrow={0}
            >
                <Grid
                    item={true}
                    xs={true}
                    padding="5px"
                >
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Grid>
                <Divider 
                    orientation="horizontal"
                    component="hr"
                />
            </Grid>
            <Grid
                container={true}
                item={true}
                xs={true}
                direction="column"
                alignItems="stretch"
                paddingX="10px"
                paddingY="2px"
                flexGrow={1}
                minHeight={"55vh"}
                maxHeight={"60vh"}
                overflow={'auto'}
            >
                {topContent &&
                <Grid
                    item={true}
                    xs={true}
                    padding="5px"
                    style={{ flexGrow: 0, marginBottom: "30px" }}
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {topContent}
                    </div>
                </Grid>}
                {isLoading?
                <Grid
                    item={true}
                    xs={true}
                    padding="5px"
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress
                            color="primary"
                            sx={{ marginRight: '5px' }} 
                            size={theme.icon.xl}
                        />
                        <Typography variant="body1">
                            Loading...
                        </Typography>
                    </div>
                </Grid>:
                error?
                <Grid
                    item={true}
                    xs={true}
                    padding="5px"
                >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ErrorOutlineOutlined
                             sx={{ fontSize: theme.icon.md, marginRight: '5px' }} 
                             color="primary"
                        />
                        <Typography textAlign="center" variant="body1" noWrap textOverflow="ellipsis">
                            Error fething the data
                        </Typography>
                    </div>
                </Grid>:
                <Grid
                    container={true}
                    item={true}
                    xs={true}
                    direction="column"
                    alignItems="stretch"
                    justifyContent="flex-start"
                    paddingY="2px"
                    flexBasis="auto"
                >
                {(items ?? []).map((item) => {
                    return (<Grid
                        key={item.id}
                        item={true}
                        xs={true}
                        maxHeight="auto"
                        marginY="3px"
                        style={{ flexGrow: 0 }}
                    >
                        <StyledPaper
                            borderRadius='sm'
                            elevation={2}    
                        >
                            <Box
                                padding="5px"
                            >
                                {renderItemContent(item)}
                            </Box>
                        </StyledPaper>
                    </Grid>);
                })}
                </Grid>
                }
                
            </Grid>
            <Grid
                container={true}
                item={true}
                xs={true}
                justifySelf="flex-end"
                direction="column"
                alignItems="stretch"
                padding="10px"
                flexGrow={0}
            >
                <Grid
                    item={true}
                    xs={true}
                >
                    <Button
                        variant='text'
                        fullWidth={true}
                        color='secondary'
                        onClick={() => setAddItemDialogOpen(true)}
                    >
                        <Icon>
                            <Add />
                        </Icon>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </StyledPaper>
    <ReusableDialog 
        open={addItemDialogOpen}
        setOpen={setAddItemDialogOpen}
        title={addItemDialogTitle}
        content={addItemDialogContent}
    />
    </>
  )
}

export default ListContainer