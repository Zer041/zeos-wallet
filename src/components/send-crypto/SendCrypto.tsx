import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import ContainerOne from "../containers/container-one/ContainerOne";
import { Autocomplete, TextField } from '@mui/material';
import { ThemeOptions } from '../..';

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  p: 2,
  m: 0,
  bgcolor: 'black',
  color: 'gray',
  margin: 'auto',
  borderRadius: 1,
  minWidth: '100%',
};

export default function SendCrypto(props: any) {
  return (
    <Box sx={containerStyle}
      maxWidth="sm">
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        style={{
          width: '100%',
        }}>
        <div style={{
          paddingBottom: '1%',
          width: '100%',
          textAlign: 'left',
        }}>
          <span>To:</span>
          <TextField
            style={{
              width: '100%',
              marginTop: '1%',
            }}
            id="filled-basic"
            label="U | T | Z address"
            variant="outlined"
            color="primary"
            focused />
        </div>

        <div style={{
          paddingTop: '1vh',
          paddingBottom: '1%',
          width: '100%',
          textAlign: 'left',
          flex: 1,
          flexDirection: 'row',
        }}>

          <Autocomplete
            id="free-solo-demo"
            freeSolo
            color="primary"
            options={top100Films.map((option) => option.title)}
            renderInput={(params) =>
              <TextField
                {...params}
                label="Symbol"
                focused />}
          />
        </div>

        <div style={{
          paddingBottom: '1%',
          width: '100%',
          textAlign: 'left',
        }}>
          <span>Memo:</span>
          <TextField
            style={{
              width: '100%',
              marginTop: '1%',
            }}
            id="filled-basic"
            label="Free text message (optional)"
            variant="outlined"
            color="primary"
            focused />
        </div>
      </Stack>
    </Box>
  );
}


const top100Films = [
  { title: 'ZEOS', year: 1994 },
  { title: 'EOS', year: 1972 },
  { title: 'NFT', year: 1974 },
];