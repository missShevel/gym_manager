import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Equipment } from 'domains';
import { useState } from 'react';
import { Paper, Table } from 'ui/components';

interface IEquipmentsTableProps {
  equipments: Equipment[];
}

export default function EquipmentsTable({ equipments }: IEquipmentsTableProps) {
  type Order = 'asc' | 'desc';
  const [rowData, setRowData] = useState(equipments);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const getMultiplier = (orderBy: Order) => (orderBy === 'asc' ? 1 : -1);

  const sortByCount = (arr, orderBy: Order) => {
    const multiplier = getMultiplier(orderBy);
    return [...arr].sort((a, b) => multiplier * (a.count - b.count));
  };

  const sortByName = (arr, orderBy: Order) => {
    const multiplier = getMultiplier(orderBy);
    return [...arr].sort((a, b) => multiplier * a.name.localeCompare(b.name));
  };

  const handleCountsSortRequest = () => {
    setRowData(sortByCount(equipments, orderDirection));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleNamesSortRequest = () => {
    setRowData(sortByName(equipments, orderDirection));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={handleNamesSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell onClick={handleCountsSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Count
              </TableSortLabel>
            </TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((equipment) => (
            <TableRow
              key={equipment.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
                '&:active': {
                  backgroundColor: 'grey.300',
                },
              }}
              onClick={() => {
                console.log(122);
              }}
            >
              <TableCell component="th" scope="row">
                {equipment.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {equipment.count}
              </TableCell>
              <TableCell component="th" scope="row">
                {equipment.link}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
