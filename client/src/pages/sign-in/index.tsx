import * as yup from 'yup';
import { forms, pages } from 'localizations';
import { Box, Button, Form, Stack, TextField, Typography } from 'ui/components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import * as Actions from 'store/reducers/user/actions';
import { useFormik } from 'formik';
import { signIn } from 'store/reducers/user/thunks';
import { useNavigate } from 'react-router-dom';
import { getStore } from 'store';
import { setMessage } from 'store/reducers/error/actions';

export default function SignInPage() {
  const { dispatch } = getStore();
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      email: 'o.shevel@gmail.com',
      password: 'admin_password',
    },
    validationSchema: yup.object().strict().shape({
      email: yup.string().email().strict().trim().required(),
      password: yup.string().strict().trim().required(),
    }),
    onSubmit(data) {
      dispatch(signIn(data))
        .unwrap()
        .then(() => navigate('/equipments'))
        .catch((e) => {
          dispatch(setMessage(e.message));
        });
    },
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 1,
        }}
      >
        <Typography variant="h1" fontSize={36}>
          {pages.signIn.header}
        </Typography>
        <AccountCircleIcon
          sx={{
            width: 100,
            height: 100,
            mb: 6,
          }}
        />
        <Form onSubmit={form.handleSubmit}>
          <Stack gap={2}>
            <TextField
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.email}
              name="email"
              type="email"
              label={forms.fields.email.label}
              error={Boolean(form.errors.email)}
              helperText={form.errors.email}
              fullWidth
            />
            <TextField
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              value={form.values.password}
              name="password"
              type="password"
              label={forms.fields.password.label}
              error={Boolean(form.errors.password)}
              helperText={form.errors.password}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={Object.values(form.touched).length === 0 || !form.isValid}
              disableElevation
            >
              {forms.buttons.submit.label}
            </Button>
          </Stack>
        </Form>
      </Box>
    </Box>
  );
}
