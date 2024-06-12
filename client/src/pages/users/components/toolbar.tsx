import { forms } from 'localizations';
import { Box, Button } from 'ui/components';

interface IUsersToolbarProps {
  handleCreateModalOpen: () => void;
}

export default function UsersToolbar({ handleCreateModalOpen }: IUsersToolbarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
      }}
    >
      <Button variant="contained" onClick={handleCreateModalOpen}>
        {forms.buttons.create.label}
      </Button>

      {/* <Box>
        <TextField placeholder="Search" />
      </Box> */}
    </Box>
  );
}
