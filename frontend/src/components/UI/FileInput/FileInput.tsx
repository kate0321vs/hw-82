import { Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useRef, useState } from 'react';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] ) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
    onChange(e);
  }

  const activateInput = () => {
    if(inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <input type="file"
      ref={inputRef} name={name}
      style={{ display: 'none' }}
      onChange={onFileChange}/>

      <Grid container direction='row' spacing={2} alignItems='center'>
        <Grid sx={{ flexGrow: 1 }}>
          <TextField value={fileName} label={label} disabled/>
        </Grid>
        <Grid>
          <Button variant="contained" onClick={activateInput}>Browse</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;