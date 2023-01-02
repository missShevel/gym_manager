import { File as FileDomain, ROLES } from 'domains';
import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
// import { pages } from 'localizations';
// import { createUser, getUsers, updateUser} from 'store/reducers/users/thunks';
import { getUsers } from 'store/reducers/users/thunks';

import { Box, Typography } from 'ui/components';
// import EquipmentsForm, { EquipmentsFormInitial } from './components/form';
import UsersTable from './components/table';
// import EquipmentToolbar from './components/toolbar';

function UsersPage({ role }: { role: ROLES }) {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.users);
  const { data: user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      dispatch(getUsers(role));
    }
  }, [user, role]);

  // const [createModalOpen, setCreateModalOpen] = useState(false);
  // const [updateModalOpen, setUpdateModalOpen] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<File>(undefined);
  // const [oldFile, setOldFile] = useState<FileDomain>(undefined);
  // const [initialValues, setInitialValues] = useState<EquipmentsFormInitial>({
  //   id: '',
  //   name: '',
  //   count: 1,
  //   link: '',
  // });

  // const handleCreateModalOpen = () => {
  //   setCreateModalOpen(true);
  // };
  // const handleUpdateModalOpen = () => {
  //   setUpdateModalOpen(true);
  // };

  // const handleClose = () => {
  //   setSelectedFile(undefined);
  //   setCreateModalOpen(false);
  //   setUpdateModalOpen(false);
  // };
  // const handleCreateEquipment = (formData) =>
  //   createEquipment({
  //     ...formData,
  //     file: selectedFile,
  //   });

  // const handleUpdateEquipment = (formData) =>
  //   updateEquipment({
  //     ...formData,
  //     id: initialValues.id,
  //     file: selectedFile,
  //     fileId: oldFile?.id,
  //   });
  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        width: 'calc(100% - 200px)',
      }}
    >
      {/* <Typography variant="h3">{pages.equipments.header}</Typography> */}
      <UsersTable
        users={data}
        // handleUpdateModalOpen={handleUpdateModalOpen}
        // setInitialValues={setInitialValues}
        // setSelectedFile={setSelectedFile}
        // setOldFile={setOldFile}
      />
      {/* <EquipmentToolbar handleCreateModalOpen={handleCreateModalOpen} /> */}
      {/* <EquipmentsForm
        isModalOpen={createModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleCreateEquipment}
        modalTitle="Create New Equipment"
        initialValues={{
          name: '',
          count: 1,
          link: '',
        }}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      /> */}
      {/* <EquipmentsForm
        isModalOpen={updateModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleUpdateEquipment}
        modalTitle="Update Equipment"
        initialValues={initialValues}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      /> */}
    </Box>
  );
}

export default UsersPage;
