import * as yup from 'yup';
import { ListItem, AppBar } from '@mui/material';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { getStore } from 'store';
import { header, forms } from 'localizations';
import { useSelector } from 'store/hooks';
import { Box, Button, Form, List, Stack, TextField, Typography } from 'ui/components';
import { createEquipment, getEquipments } from 'store/reducers/equipments/thunks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function EquipmentsPage() {
  const { dispatch } = getStore();
  const form = useFormik({
    initialValues: {
      name: '',
      count: 0,
      details: '',
    },
    validationSchema: yup.object().strict().shape({
      name: yup.string().strict().trim().required(),
      count: yup.number().strict().required(),
      details: yup.string().strict().trim().required(),
    }),
    onSubmit(data) {
      dispatch(createEquipment(data))
        .unwrap()
        .then(() => dispatch(getEquipments()));
    },
  });
  const { data, isLoading } = useSelector((store) => store.equipment);
  const { data: user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      dispatch(getEquipments());
    }
  }, [user]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <List>
        {data.map((e) => (
          <ListItem>{e.name}</ListItem>
        ))}
      </List>

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
            value={form.values.details}
            name="details"
            type="text"
            label={forms.fields.details.label}
            error={Boolean(form.errors.details)}
            helperText={form.errors.details}
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
  );
}

export default EquipmentsPage;
