import { ROLES, File as FileDomain } from 'domains';
import { pages } from 'localizations';
import { useEffect, useState } from 'react';
import { getStore } from 'store';
import { useSelector } from 'store/hooks';
import { createUser, getUsers, updateUser } from 'store/reducers/users/thunks';
import { setMessage } from 'store/reducers/error/actions';
import { Box, Typography } from 'ui/components';
import { errorMapper } from 'helpers';
import UsersTable from './components/table';
import UsersForm, { IUsersFormInitial, UsersFormInitial } from './components/form';
import UsersToolbar from './components/toolbar';

function UsersPage({ role, baseRedirect }: { role: ROLES; baseRedirect: () => void }) {
  const { dispatch } = getStore();

  const { data, isLoading } = useSelector((store) => store.users);
  const { data: user } = useSelector((store) => store.user);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>(undefined);
  const [oldFile, setOldFile] = useState<FileDomain>(undefined);
  const [initialValues, setInitialValues] = useState<IUsersFormInitial>(UsersFormInitial);
  const handleCreateModalOpen = () => {
    setInitialValues(UsersFormInitial);
    setCreateModalOpen(true);
  };
  const handleUpdateModalOpen = () => {
    setUpdateModalOpen(true);
  };

  const handleClose = () => {
    setSelectedFile(undefined);
    setOldFile(undefined);
    setCreateModalOpen(false);
    setUpdateModalOpen(false);
  };

  const handleCreateUser = (formData) =>
    createUser({
      ...formData,
      file: selectedFile,
      role,
    });
  const handleUpdateUser = (formData) =>
    updateUser({
      ...formData,
      id: initialValues.id,
      file: selectedFile,
      fileId: oldFile?.id,
      password: formData.password || null,
      role,
    });

  useEffect(() => {
    if (user) {
      dispatch(getUsers(role))
        .unwrap()
        .catch((e) => {
          dispatch(setMessage(e.message));
          if (e.message === errorMapper.PERMISSION_DENIED) {
            baseRedirect();
          }
        });
    }
  }, [user, role]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        width: 'calc(100% - 200px)',
      }}
    >
      <Typography variant="h3">{pages.users[role].header}</Typography>
      <UsersTable
        users={data}
        handleUpdateModalOpen={handleUpdateModalOpen}
        setInitialValues={setInitialValues}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
        role={role}
      />
      <UsersToolbar handleCreateModalOpen={handleCreateModalOpen} />
      <UsersForm
        isModalOpen={createModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleCreateUser}
        modalTitle="Create New User"
        initialValues={initialValues}
        role={role}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
      />
      <UsersForm
        isModalOpen={updateModalOpen}
        modalClose={handleClose}
        onSubmitAction={handleUpdateUser}
        modalTitle="Update User"
        initialValues={initialValues}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setOldFile={setOldFile}
        role={role}
      />
    </Box>
  );
}

export default UsersPage;
