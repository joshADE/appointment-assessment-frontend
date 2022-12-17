import React from 'react';
import { Grid, GridProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import '../themeConfig';


export interface Props extends GridProps {
    backgoundColor?: string;
}

const StyledGrid = styled(({ backgoundColor, ...rest} : Props) => <Grid {...rest} />)(
    ({ theme }: { theme: Theme }) =>`
    & .MuiGrid-root {
        background-color: ${(props: Props) => props.backgoundColor ? props.backgoundColor : theme.palette.background.default };
    }
`,);

export default (props: Props) => <StyledGrid {...props} />;