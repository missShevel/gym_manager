import { Box, Typography } from 'ui/components';
import { File as FileDomain } from 'domains';
import { pages } from 'localizations';
import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { errorMapper } from 'helpers';
import { createClient, updateClient, getClients } from 'store/reducers/client/thunks';
import { setMessage } from 'store/reducers/error/actions';
import ClientsTable from './components/table';
import ClientToolbar from './components/toolbar';
import ClientForm, { IClientFormInitial, ClientFormInitial } from './components/form';

function ClientsPage({ baseRedirect }: { baseRedirect: () => void }) {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.client);
  const { data: user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      dispatch(getClients())
        .unwrap()
        .catch((e) => {
          dispatch(setMessage(e.message));
          if (e.message === errorMapper.PERMISSION_DENIED) {
            baseRedirect();
          }
        });
    }
  }, [user]);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>(undefined);
  const [oldFile, setOldFile] = useState<FileDomain>(undefined);
  const [initialValues, setInitialValues] = useState<IClientFormInitial>(ClientFormInitial);

  const handleCreateModalOpen = () => {
    setInitialValues(ClientFormInitial);
    setCreateModalOpen(true);
  };

  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleClose = () => {
    setInitialValues(ClientFormInitial);
    setSelectedFile(undefined);
    setOldFile(undefined);
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
  };

  const handleCreateClient = (formData) =>
    createClient({
      ...formData,
      file: selectedFile,
    });

  const handleUpdateClient = (formData) =>
    updateClient({
      ...formData,
      id: initialValues.id,
      file: selectedFile,
      fileId: oldFile?.id,
    });

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        width: 'calc(100% - 200px)',
      }}
    >
      <Typography variant="h3">{pages.clients.header}</Typography>
      <ClientsTable
        clients={data}
        handleUpdateModalOpen={handleUpdateModalOpen}
        setInitialValues={setInitialValues}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      />
      <ClientToolbar handleCreateModalOpen={handleCreateModalOpen} />
      <ClientForm
        isModalOpen={createModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleCreateClient}
        modalTitle="Create New Client"
        initialValues={initialValues}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      />
      <ClientForm
        isModalOpen={updateModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleUpdateClient}
        modalTitle="Update Client"
        initialValues={initialValues}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      />
    </Box>
  );
}

export default ClientsPage;
