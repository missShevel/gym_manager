import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'store/hooks';
import { autoLogin } from 'store/reducers/user/thunks';

export default function RootRedirector() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading } = useSelector((state) => state.user);
  const onLoginFail = () => {
    navigate('/sign-in');
  };
  const onLoginSuccess = () => {
    navigate('/equipments');
  };
  useEffect(() => {
    if (!user) {
      dispatch(autoLogin({ onLoginFail, onLoginSuccess }));
    }
  }, []);
  if (isLoading) return <div>Loading</div>;

  // if (!user) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return <div />;
}
