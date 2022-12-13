import { EquipmentsPage, NotFoundPage, RootRedirector, SignInPage } from 'pages';
import { Routes, Route } from 'react-router-dom';
import Header from 'ui/common/Header';
import PrivateRoute from 'ui/common/PrivateRoute';
import { Box } from 'ui/components';

function Router() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route path="/" element={<RootRedirector />} />
        <Route
          path="/equipments"
          element={(
            <PrivateRoute>
              <EquipmentsPage />
            </PrivateRoute>
          )}
        />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Box>
  );
}

export default Router;
