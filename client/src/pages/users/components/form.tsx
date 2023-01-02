import * as yup from 'yup';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { File as FileDomain, ROLES } from 'domains';
import { getEquipments } from 'store/reducers/equipments/thunks';
import { Box, Button, Form, Stack, TextField } from 'ui/components';
import { forms } from 'localizations';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadImage from 'ui/common/UploadImage';
import { getUsers } from 'store/reducers/users/thunks';

export interface UsersFormInitial {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  password: string;
  role: ROLES;
}

interface IUsersForm {
  isModalOpen: boolean;
  modalClose: () => void;
  initialValues: UsersFormInitial;
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
    validationSchema: yup
      .object()
      .strict()
      .shape({
        name: yup.string().strict().trim().required(),
        count: yup.number().min(1).max(500).strict().required(),
        link: yup.string().strict().trim().url(),
        firstName: yup.string().strict().trim().required(),
        lastName: yup.string().strict().trim().required(),
        sex: yup.string().strict().trim().required(),
        email: yup.string().strict().email().trim().required(),
        password: yup.string().strict().trim().required()
      }),
    onSubmit(data) {
      dispatch(onSubmitAction(data))
        .unwrap()
        .then(() => {
          dispatch(getUsers(role));
          modalClose();
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  value={form.values.name}
                  name="name"
                  type="text"
                  label={forms.fields.name.label}
                  error={Boolean(form.errors.name)}
                  helperText={form.errors.name}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.name}
                  name="name"
                  type="text"
                  label={forms.fields.name.label}
                  error={Boolean(form.errors.name)}
                  helperText={form.errors.name}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.count}
                  name="count"
                  type="number"
                  label={forms.fields.count.label}
                  error={Boolean(form.errors.count)}
                  helperText={form.errors.count}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.link}
                  name="link"
                  type="text"
                  label={forms.fields.link.label}
                  error={Boolean(form.errors.link)}
                  helperText={form.errors.link}
                />
              </Stack>
            </div>
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
