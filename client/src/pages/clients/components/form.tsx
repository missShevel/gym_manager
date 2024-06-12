import * as yup from 'yup';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { beautifyTrainer, CLIENT_STATUS, File as FileDomain } from 'domains';
import { getClients } from 'store/reducers/client/thunks';
import { Box, Button, Form, MenuItem, Stack, TextField } from 'ui/components';
import { forms } from 'localizations';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadImage from 'ui/common/UploadImage';
import { setMessage } from 'store/reducers/error/actions';
import { useEffect, useMemo } from 'react';
import { getUsersShortlist } from 'store/reducers/users/thunks';
import { useSelector } from 'store/hooks';
import { isAllowed } from 'helpers';

export interface IClientFormInitial {
  id?: string;
  firstName: string;
  lastName: string;
  sex: string;
  status: string;
  details: string;
  trainerId: string | null;
}

export const ClientFormInitial: IClientFormInitial = {
  id: '',
  firstName: '',
  lastName: '',
  sex: '',
  status: '',
  details: '',
  trainerId: null,
};

interface IClientForm {
  isModalOpen: boolean;
  modalClose: () => void;
  initialValues: IClientFormInitial;
  onSubmitAction: (data: any) => any;
  modalTitle: string;
  setSelectedFile: (file: File) => any;
  setOldFile: (file: FileDomain) => any;
  selectedFile?: File;
}

export default function ClientForm({
  isModalOpen,
  modalClose,
  onSubmitAction,
  modalTitle,
  initialValues,
  setSelectedFile,
  selectedFile,
  setOldFile,
}: IClientForm) {
  const { dispatch } = getStore();
  const { data: user } = useSelector((store) => store.user);
  const { data: trainers, isLoading } = useSelector((store) => store.users);
  const form = useFormik({
    initialValues,
    validationSchema: yup
      .object()
      .strict()
      .shape({
        firstName: yup.string().strict().trim().required(),
        lastName: yup.string().strict().trim().required(),
        sex: yup.string().strict().trim().required(),
        status: yup.string().strict().oneOf(CLIENT_STATUS).required(),
        details: yup.string().strict(),
        trainerId: yup.string().uuid().strict().nullable(),
      }),
    onSubmit(data) {
      dispatch(onSubmitAction(data))
        .unwrap()
        .catch((e) => dispatch(setMessage(e.message)))
        .finally(() => {
          dispatch(getClients());
          modalClose();
        });
    },
    enableReinitialize: true,
  });
  useEffect(() => {
    if (isModalOpen) {
      dispatch(getUsersShortlist('TRAINER'))
        .unwrap()
        .catch((e) => dispatch(setMessage(e.message)));
    }
  }, [isModalOpen]);
  const canEdit = useMemo(() => isAllowed(user, 'edit_clients'), [user]);
  if (isLoading) return <Box>Loading</Box>;

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
                {canEdit ? (
                  <UploadImage
                    title="Upload image"
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    onCancelSelection={() => setOldFile(undefined)}
                  />
                ) : null}
              </Stack>
              <Stack gap={2} sx={{ justifySelf: 'right', width: '50%' }}>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.firstName}
                    name="firstName"
                    type="text"
                    label={forms.fields.firstName.label}
                    error={Boolean(form.errors.firstName)}
                    disabled={!canEdit}
                    helperText={form.errors.firstName}
                    sx={{ width: '100%', marginRight: '5px' }}
                  />
                  <TextField
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.lastName}
                    name="lastName"
                    type="text"
                    label={forms.fields.lastName.label}
                    error={Boolean(form.errors.lastName)}
                    disabled={!canEdit}
                    helperText={form.errors.lastName}
                    sx={{ width: '100%', marginLeft: '5px' }}
                  />
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <TextField
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.sex}
                    name="sex"
                    type="text"
                    label={forms.fields.sex.label}
                    error={Boolean(form.errors.sex)}
                    disabled={!canEdit}
                    select
                    sx={{ width: '100%', marginRight: '5px' }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.status}
                    name="status"
                    type="text"
                    label={forms.fields.status.label}
                    error={Boolean(form.errors.status)}
                    disabled={!canEdit}
                    select
                    sx={{ width: '100%', marginLeft: '5px' }}
                  >
                    {CLIENT_STATUS.map((status) => (
                      <MenuItem value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Box>
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={canEdit ? form.values.details : initialValues.details}
                  name="details"
                  type="text"
                  label={forms.fields.details.label}
                  error={Boolean(form.errors.details)}
                  helperText={form.errors.details}
                  multiline
                  rows={4}
                  disabled={!canEdit}
                />
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.trainerId}
                  name="trainerId"
                  type="text"
                  label={forms.fields.trainer.label}
                  error={Boolean(form.errors.trainerId)}
                  disabled={!canEdit}
                  select
                  sx={{ width: '100%', marginLeft: '5px' }}
                >
                  <MenuItem value={null}> </MenuItem>
                  {trainers.map((trainer) => (
                    <MenuItem value={trainer.id}>{beautifyTrainer(trainer)}</MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Box>
            <DialogActions>
              <Button
                onClick={() => {
                  modalClose();
                  form.setFieldValue('trainerId', null);
                }}
              >
                {canEdit ? 'Cancel' : 'Close'}
              </Button>
              {canEdit ? (
                <Button type="submit" variant="contained" disabled={!form.isValid} disableElevation>
                  {forms.buttons.submit.label}
                </Button>
              ) : null}
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
