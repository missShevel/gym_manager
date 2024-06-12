import { isAllowed } from 'helpers';
import { forms } from 'localizations';
import { useSelector } from 'store/hooks';
import { Box, Button } from 'ui/components';

interface IEquipmentToolbarProps {
  handleCreateModalOpen: () => void;
}

export default function EquipmentToolbar({ handleCreateModalOpen }: IEquipmentToolbarProps) {
  const { data: user } = useSelector((store) => store.user);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
      }}
    >
      {isAllowed(user, 'add_equipments') ? (
        <Button variant="contained" onClick={handleCreateModalOpen}>
          {forms.buttons.create.label}
        </Button>
      ) : null}
    </Box>
  );
}
