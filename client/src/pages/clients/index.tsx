import { Box, Typography } from 'ui/components';
import { pages } from 'localizations';
import { useEffect } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { getClients } from 'store/reducers/client/thunks';
import ClientsTable from './components/table';

function ClientsPage() {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.client);
  const { data: user } = useSelector((store) => store.user);

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
    </Box>
  );
}

export default ClientsPage;
