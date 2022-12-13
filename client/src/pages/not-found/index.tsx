import { useNavigate } from 'react-router';
import { Box, Button, Typography } from 'ui/components';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography>Oops, this page is not found</Typography>
      <Button onClick={() => navigate('/')}>Go to main</Button>
    </Box>
  );
}
