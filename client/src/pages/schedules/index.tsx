import { Box, Typography } from 'ui/components';
import { pages } from 'localizations';

function SchedulesPage() {
  return (
    <Box
      sx={{
        width: 'calc(100% - 200px)',
      }}
    >
      <Typography variant="h3">{pages.schedules.inWork}</Typography>
    </Box>
  );
}

export default SchedulesPage;
