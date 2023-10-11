/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';

interface GenericTableProps {
  data: any[];
  // eslint-disable-next-line react/require-default-props
  columnNames?: string[];
}

const GenericTable: React.FC<GenericTableProps> = ({ data, columnNames }) => {
  // Obtener las claves de uno de los objetos para generar las columnas
  // Si se proporcionan nombres de columna personalizados, utilícelos
  const keys = columnNames || (data.length ? Object.keys(data[0]) : []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {keys.map((key, index) => (
              <TableCell key={index}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {keys.map((key, cellIndex) => (
                <TableCell key={cellIndex}>{row[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
