import * as yup from 'yup';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { ROLES, File as FileDomain, beautifyRole } from 'domains';
import { Box, Button, Form, MenuItem, Stack, TextField } from 'ui/components';
import { forms } from 'localizations';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import UploadImage from 'ui/common/UploadImage';
import { getUsers } from 'store/reducers/users/thunks';
import UploadImage from 'ui/common/UploadImage';
import { setMessage } from 'store/reducers/error/actions';

export interface IUsersFormInitial {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  password: string;
  role: ROLES;
}

export const UsersFormInitial: IUsersFormInitial = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  password: '',
  role: 'MANAGER',
};

interface IUsersForm {
  isModalOpen: boolean;
  modalClose: () => void;
  initialValues: IUsersFormInitial;
  onSubmitAction: (data: any) => any;
  modalTitle: string;
  setSelectedFile: (file: File) => any;
  selectedFile?: File;
  setOldFile: (file: FileDomain) => any;
  role: ROLES;
}

export default function UsersForm({
  isModalOpen,
  modalClose,
  onSubmitAction,
  modalTitle,
  initialValues,
  setSelectedFile,
  selectedFile,
  setOldFile,
  role,
}: IUsersForm) {
  const { dispatch } = getStore();
  const form = useFormik({
    initialValues,
    validationSchema: yup.object().strict().shape({
      firstName: yup.string().strict().trim().required(),
      lastName: yup.string().strict().trim().required(),
      email: yup.string().strict().email().trim().required(),
      sex: yup.string().strict().trim().required(),
      password: yup.string().strict().trim().required(),
    }),
    onSubmit(data) {
      dispatch(onSubmitAction(data))
        .unwrap()
        .then(() => {
          modalClose();
        })
        .catch((e) => {
          dispatch(setMessage(e.message));
        })
        .finally(() => {
          dispatch(getUsers(role));
        });
    },
    enableReinitialize: true,
  });

  return (
    <Box>
      <Dialog open={isModalOpen} maxWidth="md" fullWidth={true}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent
          sx={{
            pt: '10px !important',
          }}
        >
          <Form onSubmit={form.handleSubmit}>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Stack
                sx={{
                  justifySelf: 'center',
                }}
              >
                <UploadImage
                  title="Upload image"
                  setSelectedFile={setSelectedFile}
                  selectedFile={selectedFile}
                  onCancelSelection={() => setOldFile(undefined)}
                />
              </Stack>
              <Stack gap={2} sx={{ justifySelf: 'right', width: '50%' }}>
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.firstName}
                  name="firstName"
                  type="text"
                  label={forms.fields.firstName.label}
                  error={Boolean(form.errors.firstName)}
                  helperText={form.errors.firstName}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.lastName}
                  name="lastName"
                  type="text"
                  label={forms.fields.lastName.label}
                  error={Boolean(form.errors.lastName)}
                  helperText={form.errors.lastName}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.email}
                  name="email"
                  type="email"
                  label={forms.fields.email.label}
                  error={Boolean(form.errors.email)}
                  helperText={form.errors.email}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.sex}
                  name="sex"
                  type="text"
                  label={forms.fields.sex.label}
                  error={Boolean(form.errors.sex)}
                  select
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.password}
                  name="password"
                  type="password"
                  label={forms.fields.password.label}
                  error={Boolean(form.errors.password)}
                  helperText={form.errors.password}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={role}
                  name="role"
                  type="text"
                  label={forms.fields.role.label}
                  error={Boolean(form.errors.role)}
                  helperText={form.errors.role}
                  select
                  disabled
                >
                  <MenuItem value={role}>{beautifyRole(role)}</MenuItem>
                </TextField>
              </Stack>
            </Box>
            <DialogActions>
              <Button onClick={modalClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={!form.isValid} disableElevation>
                {forms.buttons.submit.label}
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
