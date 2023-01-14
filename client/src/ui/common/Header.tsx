import { header, forms } from 'localizations';
import { AppBar, Avatar, Box, Button, Typography } from 'ui/components';
import { useDispatch } from 'store/hooks';
import { logout } from 'store/reducers/user/thunks';
import { useNavigate } from 'react-router-dom';
import { User } from 'domains';
import { useEffect, useState } from 'react';
import FileService from 'services/file';
import { setMessage } from 'store/reducers/error/actions';

const fileService = new FileService();

export default function Header({ user }: { user: User }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);

  const logOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate('/sign-in'))
      .catch((e) => dispatch(setMessage(e.message)));
  };

  useEffect(() => {
    async function fetchData() {
      const { url } = await fileService.getById(user.avatar.id);
      setAvatar(url);
    }

    if (user?.avatar?.id) fetchData();
  }, [user?.avatar]);

  return (
    <AppBar
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h5" fontSize={42} p={1}>
        {header.logo}
      </Typography>
      {user ? (
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Avatar
            sx={{
              height: '60px',
              width: '60px',
            }}
            src={avatar}
          />
          <Typography fontSize={24} textTransform="capitalize">
            {user.firstName}
            &nbsp;
            {user.lastName}
          </Typography>

          <Button variant="contained" color="info" onClick={logOut}>
            {forms.buttons.logout.label}
          </Button>
        </Box>
      ) : null}
    </AppBar>
  );
}
