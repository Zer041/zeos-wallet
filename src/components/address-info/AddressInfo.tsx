import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import ContainerTwo from '../containers/container-two/ContainerTwo';
import { ContainerTwoProps } from '../containers/container-two/models/ContainerTwoProps';


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

export default function AddressInfo(props: Array<ContainerTwoProps>) {

  const renderData = () => {
    return Object.assign([], props).map((element: any, index: any) => {
      return <ContainerTwo key={index} {...element}></ContainerTwo>
    });
  }

  return (
    <div>
      {props ? renderData() : null}
    </div>
  );
}
