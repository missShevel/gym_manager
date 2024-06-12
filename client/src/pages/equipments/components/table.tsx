import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Equipment, File as FileDomain } from 'domains';
import { formatFileName, isAllowed } from 'helpers';
import { useState } from 'react';
import FileService from 'services/file';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { deleteEquipment, getEquipments } from 'store/reducers/equipments/thunks';
import { Button, Paper, Table } from 'ui/components';
import { IEquipmentsFormInitial } from './form';

interface IEquipmentsTableProps {
  equipments: Equipment[];
  handleUpdateModalOpen: () => void;
  setSelectedFile: (file: File) => any;
  setOldFile: (file: FileDomain) => any;
  setInitialValues: (data: IEquipmentsFormInitial) => void;
}
const { dispatch } = getStore();

const fileService = new FileService();

export default function EquipmentsTable({
  equipments,
  handleUpdateModalOpen,
  setInitialValues,
  setSelectedFile,
  setOldFile,
}: IEquipmentsTableProps) {
  type Order = 'asc' | 'desc';
  const [rowData, setRowData] = useState(equipments);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const { data: user } = useSelector((store) => store.user);
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

  const handleDelete = (id: string) => {
    dispatch(deleteEquipment(id))
      .unwrap()
      .catch((e) => dispatch(e.message))
      .finally(() => dispatch(getEquipments()));
  };

  return (
    <TableContainer component={Paper} sx={{ height: 550 }}>
      <Table stickyHeader sx={{ minWidth: 650, height: 'max-content' }}>
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
            {isAllowed(user, 'remove_equipments') ? <TableCell>Delete</TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((equipment) => (
            <TableRow
              key={equipment.id}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
                '&:active': {
                  backgroundColor: 'grey.300',
                },
              }}
              onClick={async () => {
                setInitialValues({ ...equipment });
                if (equipment.avatar) {
                  setOldFile(equipment.avatar);
                  const { blob } = await fileService.getById(equipment.avatar.id);
                  const file = new File([blob], formatFileName(equipment.avatar));
                  setSelectedFile(file);
                }
                handleUpdateModalOpen();
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
              {isAllowed(user, 'remove_equipments') ? (
                <TableCell>
                  <Button
                    variant="outlined"
                    component="th"
                    scope="row"
                    sx={{
                      color: 'error.main',
                      borderColor: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.main',
                        color: 'error.contrastText',
                        borderColor: 'error.main',
                      },
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(equipment.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
