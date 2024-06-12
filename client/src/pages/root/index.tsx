import { User } from 'domains';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'store/hooks';
import { setMessage } from 'store/reducers/error/actions';
import { autoLogin } from 'store/reducers/user/thunks';

export default function RootRedirector({ user }: { user: User }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.user);
  const onLoginFail = () => {
    navigate('/sign-in');
  };
  const onLoginSuccess = () => {
    navigate('/equipments');
  };
  useEffect(() => {
    if (!user) {
      dispatch(autoLogin({ onLoginFail, onLoginSuccess }))
        .unwrap()
        .catch((e) => dispatch(setMessage(e.message)));
    }
  }, []);
  if (isLoading) return <div>Loading</div>;

  // if (!user) {
  //   return <Navigate to="/sign-in" replace />;
  // }

  return <div />;
}
