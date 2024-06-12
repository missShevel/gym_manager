import * as yup from 'yup';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { File as FileDomain } from 'domains';
import { getEquipments } from 'store/reducers/equipments/thunks';
import { Box, Button, Form, Stack, TextField } from 'ui/components';
import { forms } from 'localizations';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadImage from 'ui/common/UploadImage';
import { setMessage } from 'store/reducers/error/actions';
import { useSelector } from 'store/hooks';
import { useMemo } from 'react';
import { isAllowed } from 'helpers';

export interface IEquipmentsFormInitial {
  id?: string;
  name: string;
  count: number;
  link: string;
}

interface IEquipmentsForm {
  isModalOpen: boolean;
  modalClose: () => void;
  initialValues: IEquipmentsFormInitial;
  onSubmitAction: (data: any) => any;
  modalTitle: string;
  setSelectedFile: (file: File) => any;
  selectedFile?: File;
  setOldFile: (file: FileDomain) => any;
}

export default function EquipmentsForm({
  isModalOpen,
  modalClose,
  onSubmitAction,
  modalTitle,
  initialValues,
  setSelectedFile,
  selectedFile,
  setOldFile,
}: IEquipmentsForm) {
  const { dispatch } = getStore();
  const { data: user } = useSelector((store) => store.user);
  const form = useFormik({
    initialValues,
    validationSchema: yup
      .object()
      .strict()
      .shape({
        name: yup.string().strict().trim().required(),
        count: yup.number().min(1).max(500).strict().required(),
        link: yup.string().strict().trim().url(),
      }),
    onSubmit(data) {
      dispatch(onSubmitAction(data))
        .unwrap()
        .catch((e) => dispatch(setMessage(e.message)))
        .finally(() => {
          dispatch(getEquipments());
          modalClose();
        });
    },
    enableReinitialize: true,
  });
  const canEdit = useMemo(() => isAllowed(user, 'edit_equipments'), [user]);

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
                <TextField
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.name}
                  name="name"
                  type="text"
                  label={forms.fields.name.label}
                  error={Boolean(form.errors.name)}
                  helperText={form.errors.name}
                  disabled={!canEdit}
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
                  disabled={!canEdit}
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
                  disabled={!canEdit}
                />
              </Stack>
            </div>
            <DialogActions>
              <Button onClick={modalClose}>{canEdit ? 'Cancel' : 'Close'}</Button>
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
