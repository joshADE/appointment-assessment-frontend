import React from 'react';
import { Grid, Button, Divider, Typography, Icon, Box, CircularProgress, useTheme } from '@mui/material';
import StyledPaper from '../styledComponents/StyledPaper';
import { AuditableBaseEntity } from '../services/types/common/entity';
import { Add, ErrorOutlineOutlined } from '@mui/icons-material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
interface Props<T extends AuditableBaseEntity> {
    title: string;
    canFilterByDate?: boolean;
    isLoading: boolean;
    items?: T[];
    renderItemContent:(item: T) => React.ReactNode;
    error?: FetchBaseQueryError | SerializedError; 
}


const ListContainer: <T extends AuditableBaseEntity>(props: Props<T>) => JSX.Element = ({
    items,
    renderItemContent,
    canFilterByDate,
    title,
    isLoading,
    error,
}) => {
    const theme = useTheme();
  return (
    <StyledPaper
        borderRadius='md'
        elevation={1}
    >
        <Grid
            container={true}
            direction="column"
            alignItems="stretch"
            justifyContent="space-between"
            minHeight={"50vh"}
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
            >
                <Grid
                    item={true}
                    xs={true}
                    padding="5px"
                    flexGrow={0}
                    flexShrink={1}
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
            >
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
                <>
                {(items ?? []).map((item) => {
                    return (<Grid
                        key={item.id}
                        item={true}
                        xs={true}
                        padding="5px"
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
                </>
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
            >
                <Grid
                    item={true}
                    xs={true}
                >
                    <Button
                        variant='text'
                        fullWidth={true}
                        color='secondary'
                    >
                        <Icon>
                            <Add />
                        </Icon>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    </StyledPaper>
  )
}

export default ListContainer