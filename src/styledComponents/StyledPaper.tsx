import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import '../themeConfig';
type validsizes = keyof Theme["roundening"];

export interface Props extends PaperProps {
    borderRadius?: validsizes;
    minHeight?: string;
}

const StyledPaper = styled(({ borderRadius, minHeight, ...rest} : Props) => <Paper {...rest} />)(
    ({ theme }: { theme: Theme }) => (({ borderRadius, minHeight }: Props) => `
    &.MuiPaper-root {
        border-radius: ${(borderRadius ? theme.roundening[borderRadius] : "0px")};
        min-height: ${(minHeight ? minHeight : "auto")};
    }
`));

export default (props: Props) => <StyledPaper {...props} />;
