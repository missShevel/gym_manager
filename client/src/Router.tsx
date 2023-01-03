import {
  EquipmentsPage,
  NotFoundPage,
  RootRedirector,
  SignInPage,
  UsersPage,
  ClientsPage,
} from 'pages';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'store/hooks';
import Header from 'ui/common/Header';
import PrivateRoute from 'ui/common/PrivateRoute';
import Sidebar from 'ui/common/Sidebar';
import { Box } from 'ui/components';

function Router() {
  const { data: user } = useSelector((store) => store.user);

  return (
    <Box>
      <Header user={user} />
      <Box
        sx={[
          user && {
            display: 'flex',
            margin: 0,
            gap: 1,
          },
        ]}
      >
        {user && <Sidebar user={user} />}
        <Routes>
          <Route path="/" element={<RootRedirector user={user} />} />
          <Route
            path="/equipments"
            element={
              <PrivateRoute>
                <EquipmentsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/managers"
            element={
              <PrivateRoute>
                <UsersPage role="MANAGER" />
              </PrivateRoute>
            }
          />
          <Route
            path="/trainers"
            element={
              <PrivateRoute>
                <UsersPage role="TRAINER" />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <ClientsPage />
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
