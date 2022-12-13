import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'store/hooks';
import { autoLogin } from 'store/reducers/user/thunks';

export default function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading } = useSelector((state) => state.user);
  const onLoginFail = () => {
    navigate('/sign-in');
  };
  useEffect(() => {
    if (!user) {
      dispatch(autoLogin({ onLoginFail }));
    }
  }, []);
  if (isLoading) return <div>Loading</div>;

  // if (!user) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return children;
}
