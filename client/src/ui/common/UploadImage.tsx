import { ChangeEvent } from 'react';
import { Box, Button } from 'ui/components';
import CancelIcon from '@mui/icons-material/Cancel';

interface IUploadImageProps {
  title: string;
  setSelectedFile: (file: File) => any;
  selectedFile?: File;
  onCancelSelection: () => any;
}

export default function UploadImage({
  title,
  setSelectedFile,
  selectedFile,
  onCancelSelection,
}: IUploadImageProps) {
  const handleUpload = (file: File) => {
    console.log('Upload file: ', file);
  };
  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };
  const handleCancelSelection = () => {
    setSelectedFile(undefined);
    onCancelSelection();
  };

  return (
    <Box>
      {selectedFile ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box
              sx={{
                maxWidth: '200px',
                maxHeight: '200px',
              }}
              component="img"
              alt="avatar"
              src={window.URL.createObjectURL(selectedFile)}
            />
          </Box>

          <Button component="span" onClick={handleCancelSelection}>
            <CancelIcon />
          </Button>
        </Box>
      ) : (
        <Button component="label">
          <input
            style={{ display: 'none' }}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
          <Button variant="outlined" component="span">
            {title}
          </Button>
        </Button>
      )}
    </Box>
  );
}
