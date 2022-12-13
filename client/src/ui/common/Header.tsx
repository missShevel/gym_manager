import { header, forms } from 'localizations';
import { AppBar, Box, Button, Typography } from 'ui/components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'store/hooks';
import { logout } from 'store/reducers/user/thunks';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((store) => store.user);
  const logOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => navigate('/sign-in'));
  };

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
          <AccountCircleIcon
            sx={{
              width: 40,
              height: 40,
            }}
          />
          <Typography fontSize={24} textTransform="capitalize">
            {user.firstName}
            &nbsp;
            {user.lastName}
          </Typography>

          <Button variant="contained" color="primary" onClick={logOut}>
            {forms.buttons.logout.label}
          </Button>
        </Box>
      ) : null}
    </AppBar>
  );
}
