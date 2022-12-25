import { forms } from 'localizations';
import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { createEquipment, getEquipments, updateEquipment } from 'store/reducers/equipments/thunks';
import { Box, Typography, Button } from 'ui/components';
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
      <EquipmentsTable
        equipments={data}
        modalOptions={{
          modalOpen: handleClickOpen,
          isModalOpen: open,
          modalClose: handleCancel,
          onSubmitAction: updateEquipment,
          modalTitle: 'Update Equipment',
        }}
      />
      <EquipmentsCreateForm
        isModalOpen={open}
        modalClose={handleCancel}
        onSubmitAction={createEquipment}
        modalTitle="Create New Equipment"
        initialValues={{
          name: '',
          count: 1,
          link: '',
        }}
      />
      <Button variant="outlined" onClick={handleClickOpen}>
        {forms.buttons.create.label}
      </Button>
    </Box>
  );
}

export default EquipmentsPage;
