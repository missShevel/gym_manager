import { useNavigate } from 'react-router';
import { useSelector } from 'store/hooks';
import { sidebarItems } from 'ui/common/Sidebar/constants';
import { sidebarPermissionFilter } from 'ui/common/Sidebar/helpers';
import { Box, Button, Typography } from 'ui/components';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { data: user } = useSelector((store) => store.user);
  const defaultUrl = sidebarItems
    .filter(sidebarPermissionFilter(user))
    .find((i) => i.isDefault)?.url;
  const route = user ? defaultUrl : '/sign-in';

  return (
    <Box>
      <Typography>Oops, this page is not found</Typography>
      <Button onClick={() => navigate(route)}>Go to main</Button>
    </Box>
  );
}
