import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Radio, FormControlLabel, useTheme  } from '@mui/material';

// Data structure for the table
const frequencyData = [
  { frequency: '1 vez cada 5 minutos', lessThanOne: 1, oneToTwo: 0.95, moreThanTwo: 0.85 },
  { frequency: '1 vez/minuto', lessThanOne: 0.94, oneToTwo: 0.88, moreThanTwo: 0.75 },
  { frequency: '4 veces/minuto', lessThanOne: 0.84, oneToTwo: 0.72, moreThanTwo: 0.45 },
  { frequency: '9 veces/minuto', lessThanOne: 0.52, oneToTwo: 0.30, moreThanTwo: 0.00 },
  { frequency: '12 veces/minuto', lessThanOne: 0.37, oneToTwo: 0.00, moreThanTwo: 0.00 },
  { frequency: '> 15 veces/minuto', lessThanOne: 0.00, oneToTwo: 0.00, moreThanTwo: 0.00 },
];

function FrequencyInputTable() {
  const [selectedValue, setSelectedValue] = useState('');
  const theme = useTheme();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <TableContainer sx={{ maxWidth: 500 }}>
      <Table aria-label="frequency table" sx={{ minWidth: 400 }}>
        <TableHead >
          <TableRow>
            <TableCell sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>FRECUENCIA DE MANIPULACIÓN</TableCell>
            <TableCell align="right" sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}> Menos de 1 h/día</TableCell>
            <TableCell align="right" sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}> Más de 1 h/día y menos de 2 h</TableCell>
            <TableCell align="right" sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}> Más de 2 h y ≤ 8 h</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {frequencyData.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                {row.frequency}
              </TableCell>
              <TableCell align="right">
                <FormControlLabel value={`${row.frequency}-lessThanOne`} control={<Radio />} label={`${row.lessThanOne}`} checked={selectedValue === `${row.frequency}-lessThanOne`} onChange={handleChange} />
              </TableCell>
              <TableCell align="right">
                <FormControlLabel value={`${row.frequency}-oneToTwo`} control={<Radio />} label={`${row.oneToTwo}`} checked={selectedValue === `${row.frequency}-oneToTwo`} onChange={handleChange} />
              </TableCell>
              <TableCell align="right">
                <FormControlLabel value={`${row.frequency}-moreThanTwo`} control={<Radio />} label={`${row.moreThanTwo}`} checked={selectedValue === `${row.frequency}-moreThanTwo`} onChange={handleChange} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FrequencyInputTable;
