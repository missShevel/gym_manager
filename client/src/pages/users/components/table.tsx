import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { User, File as FileDomain, ROLES } from 'domains';
import { formatFileName, Order, sortByString } from 'helpers';
import { useState } from 'react';
import FileService from 'services/file';
import { getStore } from 'store';
import { setMessage } from 'store/reducers/error/actions';
import { deleteUser, getUsers } from 'store/reducers/users/thunks';
import { Button, Paper, Table } from 'ui/components';
import { IUsersFormInitial, UsersFormInitial } from './form';

interface IUsersTableProps {
  users: User[];
  handleUpdateModalOpen: () => void;
  setSelectedFile: (file: File) => any;
  setOldFile: (file: FileDomain) => any;
  setInitialValues: (data: IUsersFormInitial) => void;
  role: ROLES;
}
const { dispatch } = getStore();

const fileService = new FileService();

export default function UsersTable({
  users,
  handleUpdateModalOpen,
  setInitialValues,
  setSelectedFile,
  setOldFile,
  role,
}: IUsersTableProps) {
  const [rowData, setRowData] = useState(users);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');

  const sortByName = (arr: User[], orderBy: Order) => {
    const full = arr.map((u) => ({
      ...u,
      fullName: `${u.firstName} ${u.lastName}`,
    }));
    return sortByString(full, orderBy, 'fullName');
  };

  const handleNamesSortRequest = () => {
    setRowData(sortByName(users, orderDirection));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleEmailSortRequest = () => {
    setRowData(sortByString(users, orderDirection, 'email'));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id))
      .unwrap()
      .catch((e) => dispatch(setMessage(e.message)))
      .finally(() => dispatch(getUsers(role)));
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
            <TableCell onClick={handleEmailSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Delete</TableCell>
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
              onClick={async () => {
                setInitialValues({
                  ...UsersFormInitial,
                  ...user,
                  role: user.role.id as ROLES,
                  password: '',
                });
                if (user.avatar) {
                  setOldFile(user.avatar);
                  const { blob } = await fileService.getById(user.avatar.id);
                  const file = new File([blob], formatFileName(user.avatar));
                  setSelectedFile(file);
                }
                handleUpdateModalOpen();
              }}
            >
              <TableCell component="th" scope="row">
                {`${user.firstName} ${user.lastName}`}
              </TableCell>
              <TableCell component="th" scope="row">
                {user.email}
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
