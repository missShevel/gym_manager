import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { getEquipments } from 'store/reducers/equipments/thunks';
import { Box, Typography } from 'ui/components';
import EquipmentsCreateForm from './components/form';
import EquipmentsTable from './components/table';

function EquipmentsPage() {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.equipment);
  const { data: user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      dispatch(getEquipments());
    }
  }, [user]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <EquipmentsTable equipments={data} />
      <EquipmentsCreateForm
        modalOpen={handleClickOpen}
        isModalOpen={open}
        modalClose={handleCancel}
      />
    </Box>
  );
}

export default EquipmentsPage;
