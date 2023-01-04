import { forms } from 'localizations';
import { Box, Button } from 'ui/components';

interface IClientToolbarProps {
  handleCreateModalOpen: () => void;
}

export default function ClientToolbar({ handleCreateModalOpen }: IClientToolbarProps) {
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