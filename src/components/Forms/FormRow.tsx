import React from 'react';
import { Grid } from '@mui/material';

interface FormRowProps {
  children: React.ReactNode[];
}

const FormRow: React.FC<FormRowProps> = ({ children }) => {
  const error = new Error('FormRow must have at least one child and maximum four children');
  if (!children?.length || children.length > 4) throw error;

  const columnWidth = 12 / children.length;

  return (
    <Grid sx={{ mt: 1 }} container spacing={2}>
      {children.map((child, index) => (
        <Grid item xs={columnWidth} key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

export default FormRow;
