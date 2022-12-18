import Box from '@mui/material/Box';
import ContainerOne from "../containers/container-one/ContainerOne";

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  p: 0,
  m: 0,
  bgcolor: 'black',
  minWidth: '100%',
  margin: 'auto',
  borderRadius: 1,
  color: 'white',
};

export default function TransactionInfo(props: any) {
  const renderData = () => {
    return Object.assign([], props).map((element: any, index: any) => {
      return <ContainerOne key={index} {...element}></ContainerOne>
    });
  }

  return (
    <Box sx={containerStyle}
      maxWidth="sm">
      {props && JSON.stringify(props) !== '{}' ? renderData() : <h4 style={{padding: '2vh', width: '100%', textAlign: 'center'}}>No Data available</h4>}
    </Box>
  );
}
