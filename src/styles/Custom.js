import { styled } from '@mui/system';
import { Divider, TextField } from '@mui/material';

export const FullTextField = styled(TextField)({
    width: '100%',
});

export const FixedDivider = styled(Divider)({
    width: '100%',
    marginTop: '1rem',
    marginBottom: '1rem',
});

export const WhiteSpace = styled('div')({
    width: '100%',
    height: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
});