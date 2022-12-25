import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Equipment } from 'domains';
import { useEffect, useState } from 'react';
import { updateEquipment } from 'store/reducers/equipments/thunks';
import { Paper, Table } from 'ui/components';
import EquipmentsCreateForm from './form';

interface IEquipmentsTableProps {
  equipments: Equipment[];
  modalOptions: {
    modalOpen: () => void;
    isModalOpen: boolean;
    modalClose: () => void;
    onSubmitAction: (data: any) => any;
    modalTitle: string;
  };
}

export default function EquipmentsTable({ equipments, modalOptions }: IEquipmentsTableProps) {
  type Order = 'asc' | 'desc';
  const [rowData, setRowData] = useState(equipments);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const getMultiplier = (orderBy: Order) => (orderBy === 'asc' ? 1 : -1);
  const [selectedRow, setSelectedRow] = useState<Equipment | null>(null);

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

  const [open, setOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({ name: '', count: 1, link: '' });
  useEffect(() => {
    if (!selectedRow) setInitialValues({ name: '', count: 1, link: '' });
    else
      setInitialValues({
        name: selectedRow.name,
        count: selectedRow.count,
        link: selectedRow.link,
      });
  }, [selectedRow]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <EquipmentsCreateForm
        isModalOpen={open}
        modalClose={handleCancel}
        onSubmitAction={updateEquipment}
        modalTitle="Update Equipment"
        initialValues={initialValues}
      />
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
                  setSelectedRow(equipment);
                  handleClickOpen();
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
    </>
  );
}
