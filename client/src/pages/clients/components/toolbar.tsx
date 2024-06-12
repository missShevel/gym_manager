import { isAllowed } from 'helpers';
import { forms } from 'localizations';
import { useSelector } from 'store/hooks';
import { Box, Button } from 'ui/components';

interface IClientToolbarProps {
  handleCreateModalOpen: () => void;
}

export default function ClientToolbar({ handleCreateModalOpen }: IClientToolbarProps) {
  const { data: user } = useSelector((store) => store.user);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
      }}
    >
      {isAllowed(user, 'add_clients') ? (
        <Button variant="contained" onClick={handleCreateModalOpen}>
          {forms.buttons.create.label}
        </Button>
      ) : null}

      {/* <Box>
        <TextField placeholder="Search" />
      </Box> */}
    </Box>
  );
}
