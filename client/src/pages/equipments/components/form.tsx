import * as yup from 'yup';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { createEquipment, getEquipments } from 'store/reducers/equipments/thunks';
import { Box, Button, Form, Stack, TextField } from 'ui/components';
import { forms } from 'localizations';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface IEquipmentsCreateForm {
  modalOpen: () => void;
  isModalOpen: boolean;
  modalClose: () => void;
}

export default function EquipmentsCreateForm({
  modalOpen,
  isModalOpen,
  modalClose,
}: IEquipmentsCreateForm) {
  const { dispatch } = getStore();

  const form = useFormik({
    initialValues: {
      name: '',
      count: 1,
      link: '',
    },
    validationSchema: yup
      .object()
      .strict()
      .shape({
        name: yup.string().strict().trim().required(),
        count: yup.number().min(1).max(500).strict().required(),
        link: yup.string().strict().trim().url(),
      }),
    onSubmit(data) {
      dispatch(createEquipment(data))
        .unwrap()
        .then(() => {
          dispatch(getEquipments());
          modalClose();
        });
    },
  });

  return (
    <Box>
      <Button variant="outlined" onClick={modalOpen}>
        {forms.buttons.create.label}
      </Button>
      <Dialog open={isModalOpen}>
        <DialogTitle>Create New Equipment</DialogTitle>
        <DialogContent>
          <Form onSubmit={form.handleSubmit}>
            <Stack gap={2}>
              <TextField
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.name}
                name="name"
                type="text"
                label={forms.fields.name.label}
                error={Boolean(form.errors.name)}
                helperText={form.errors.name}
                fullWidth
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
                fullWidth
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
                fullWidth
              />
            </Stack>
            <DialogActions>
              <Button onClick={modalClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={Object.values(form.touched).length === 0 || !form.isValid}
                disableElevation
              >
                {forms.buttons.submit.label}
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
