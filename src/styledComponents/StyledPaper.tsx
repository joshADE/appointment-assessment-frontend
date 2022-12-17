import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import '../themeConfig';
type validsizes = keyof Theme["roundening"];

export interface Props extends PaperProps {
    borderRadius?: validsizes;
}

const StyledPaper = styled(({ borderRadius, ...rest} : Props) => <Paper {...rest} />)(
    ({ theme }: { theme: Theme }) => (({ borderRadius }: Props) => `
    &.MuiPaper-root {
        border-radius: ${(borderRadius ? theme.roundening[borderRadius] : "0px")};
    }
`));

export default (props: Props) => <StyledPaper {...props} />;
