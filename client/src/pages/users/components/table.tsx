import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { File as FileDomain, User } from 'domains';
import { formatFileName } from 'helpers';
import { useState } from 'react';
import FileService from 'services/file';
import { getStore } from 'store';
import { deleteEquipment, getEquipments } from 'store/reducers/equipments/thunks';
import { Button, Paper, Table } from 'ui/components';
import { EquipmentsFormInitial } from './form';

interface IUsersTableProps {
  users: User[];
  // handleUpdateModalOpen: () => void;
  // setSelectedFile: (file: File) => any;
  // setOldFile: (file: FileDomain) => any;
  // setInitialValues: (data: EquipmentsFormInitial) => void;
}
const { dispatch } = getStore();

const fileService = new FileService();

export default function UsersTable({
  users,
}: //   handleUpdateModalOpen,
//   setInitialValues,
//   setSelectedFile,
//   setOldFile,
IUsersTableProps) {
  type Order = 'asc' | 'desc';
  const [rowData, setRowData] = useState(users);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const getMultiplier = (orderBy: Order) => (orderBy === 'asc' ? 1 : -1);

  const sortByName = (arr, orderBy: Order) => {
    const multiplier = getMultiplier(orderBy);
    return [...arr].sort((a, b) => multiplier * a.name.localeCompare(b.name));
  };

  const handleNamesSortRequest = () => {
    setRowData(sortByName(users, orderDirection));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteEquipment(id))
      .unwrap()
      .then(() => dispatch(getEquipments()));
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'grey.200',
                },
                '&:active': {
                  backgroundColor: 'grey.300',
                },
              }}
              // onClick={async () => {
              //   // setInitialValues({ ...equipment });
              //   // if (equipment.avatar) {
              //   //   setOldFile(equipment.avatar);
              //   //   const { blob } = await fileService.getById(equipment.avatar.id);
              //   //   const file = new File([blob], formatFileName(equipment.avatar));
              //   //   setSelectedFile(file);
              //   }
              //   handleUpdateModalOpen();
              // }}
            >
              <TableCell component="th" scope="row">
                {user.firstName} {user.lastName}
              </TableCell>
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
                    handleDelete(user.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
