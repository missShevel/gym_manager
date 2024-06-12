import {
  EquipmentsPage,
  NotFoundPage,
  RootRedirector,
  SignInPage,
  UsersPage,
  ClientsPage,
  SchedulesPage,
} from 'pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { setMessage } from 'store/reducers/error/actions';
import ErrorMessage from 'ui/common/ErrorMessage';
import Header from 'ui/common/Header';
import PrivateRoute from 'ui/common/PrivateRoute';
import Sidebar from 'ui/common/Sidebar';
import { sidebarItems } from 'ui/common/Sidebar/constants';
import { sidebarPermissionFilter } from 'ui/common/Sidebar/helpers';
import { Box } from 'ui/components';

function Router() {
  const { data: user } = useSelector((store) => store.user);
  const { message } = useSelector((store) => store.error);
  const [open, setOpen] = useState(false);
  const { dispatch } = getStore();
  const navigate = useNavigate();
  const sidebarItemsFiltered = sidebarItems.filter(sidebarPermissionFilter(user));

  const baseRedirect = () => navigate(sidebarItemsFiltered[0]?.url);

  useEffect(() => {
    if (message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [message]);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(setMessage(null));
  };

  return (
    <Box>
      <Header user={user} />
      <ErrorMessage open={open} message={message} handleClose={handleClose} />
      <Box
        sx={[
          user && {
            display: 'flex',
            margin: 0,
            gap: 1,
          },
        ]}
      >
        {user && <Sidebar sidebarItemsFiltered={sidebarItemsFiltered} />}
        <Routes>
          <Route path="/" element={<RootRedirector user={user} />} />
          <Route
            path="/equipments"
            element={
              <PrivateRoute>
                <EquipmentsPage baseRedirect={baseRedirect} />
              </PrivateRoute>
            }
          />
          <Route
            path="/managers"
            element={
              <PrivateRoute>
                <UsersPage role="MANAGER" baseRedirect={baseRedirect} />
              </PrivateRoute>
            }
          />
          <Route
            path="/trainers"
            element={
              <PrivateRoute>
                <UsersPage role="TRAINER" baseRedirect={baseRedirect} />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <ClientsPage baseRedirect={baseRedirect} />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <PrivateRoute>
                <SchedulesPage />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default Router;
