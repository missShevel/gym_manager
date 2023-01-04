import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { Client, File as FileDomain } from 'domains';
import { formatFileName, Order, sortByString } from 'helpers';
import { useState } from 'react';
import FileService from 'services/file';
import { Button, Paper, Table } from 'ui/components';
import { getStore } from 'store';
import { deleteClient, getClients } from 'store/reducers/client/thunks';
import { IClientFormInitial } from './form';

interface IClientsTableProps {
  clients: Client[];
  handleUpdateModalOpen: () => void;
  setSelectedFile: (file: File) => any;
  setOldFile: (file: FileDomain) => any;
  setInitialValues: (data: IClientFormInitial) => void;
}

const { dispatch } = getStore();

const fileService = new FileService();

export default function ClientsTable({
  clients,
  handleUpdateModalOpen,
  setInitialValues,
  setSelectedFile,
  setOldFile,
}: IClientsTableProps) {
  const [rowData, setRowData] = useState(clients);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');

  const sortByName = (arr: Client[], orderBy: Order) => {
    const full = arr.map((u) => ({
      ...u,
      fullName: `${u.firstName} ${u.lastName}`,
    }));
    return sortByString(full, orderBy, 'fullName');
  };

  const handleNamesSortRequest = () => {
    setRowData(sortByName(clients, orderDirection));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleStatusSortRequest = () => {
    setRowData(sortByString(clients, orderDirection, 'status'));
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id))
      .unwrap()
      .then(() => dispatch(getClients()));
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
            <TableCell onClick={handleStatusSortRequest}>
              <TableSortLabel active={true} direction={orderDirection}>
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((client) => (
            <TableRow
              key={client.id}
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
                  ...client,
                });
                if (client.avatar) {
                  setOldFile(client.avatar);
                  const { blob } = await fileService.getById(client.avatar.id);
                  const file = new File([blob], formatFileName(client.avatar));
                  setSelectedFile(file);
                }
                handleUpdateModalOpen();
              }}
            >
              <TableCell component="th" scope="row">
                {`${client.firstName} ${client.lastName}`}
              </TableCell>
              <TableCell component="th" scope="row">
                {client.status}
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
                    handleDelete(client.id);
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
