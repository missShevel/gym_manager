import { Box, Typography } from 'ui/components';
import { File as FileDomain } from 'domains';
import { pages } from 'localizations';
import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { createClient, getClients } from 'store/reducers/client/thunks';
import ClientsTable from './components/table';
import ClientToolbar from './components/toolbar';
import ClientsForm from './components/form';

function ClientsPage() {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.client);
  const { data: user } = useSelector((store) => store.user);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>(undefined);
  const [oldFile, setOldFile] = useState<FileDomain>(undefined);

  // const [initialValues, setInitialValues] = useState<ClientsFormInitial>({
  //   id: '',
  //   name: '',
  //   count: 1,
  //   link: '',
  // });

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setCreateModalOpen(false);
  };

  const handleCreateClient = (formData) =>
    createClient({
      ...formData,
      file: selectedFile,
    });

  useEffect(() => {
    if (user) {
      dispatch(getClients());
    }
  }, [user]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        width: 'calc(100% - 200px)',
      }}
    >
      <Typography variant="h3">{pages.clients.header}</Typography>
      <ClientsTable clients={data} />
      <ClientToolbar handleCreateModalOpen={handleCreateModalOpen} />
      <ClientsForm
        isModalOpen={createModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleCreateClient}
        modalTitle="Create New Client"
        initialValues={{
          firstName: '',
          lastName: '',
          sex: '',
          status: 'Beginner',
          details: '',
        }}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      />
    </Box>
  );
}

export default ClientsPage;
