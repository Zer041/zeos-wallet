import { Button } from '@mui/material';
import * as React from 'react'
import { ContainerOneProps } from '../../../components/containers/container-one/models/ContainerOnePropTypes';
import SendCrypto from '../../../components/send-crypto/SendCrypto';

interface SendState {
  items: number[];
}

class SendDeAnonymize extends React.Component<{}, SendState> {
  public containerOneProp: Array<ContainerOneProps> = [
    {
      top: {
        plainText: 'Spendable Funds',
        fontSize: '1rem',
        fontColor: 'white',
      },
      middle: {
        plainText: 'ZEOS 113.6453',
        fontSize: '1.2rem',
        fontColor: 'yellow',
      },
      bottom: {
        fontSize: '0.9rem',
        fontColor: 'gray',
        plainText: 'USD --',
      }
    },
    {
      top: {
        plainText: 'All Funds',
        fontSize: '1rem',
        fontColor: 'white',
      },
      middle: {
        plainText: 'EOS 1440.4155',
        fontSize: '1.2rem',
        fontColor: 'yellow',
      },
      bottom: {
        fontSize: '0.9rem',
        fontColor: 'gray',
        plainText: 'USD --',
      }
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      items: []
    };
  }

  addTransaction = () => {
    let dateTime = new Date().getTime();
    console.log(dateTime);
    this.state.items.push(dateTime);
    this.setState({ items: this.state.items });
  }

  sendTransaction = () => {
    console.log(`(${this.state.items.length + 1}) Transactions sent`);
  }

  removeTransaction = (index: number) => {
    console.log(index);
    this.state.items.splice(this.state.items.indexOf(index, 0), 1);
    this.setState({ items: this.state.items });
  }

  render() {
    return (
      <div>
        <div style={{
          backgroundColor: 'black',
          marginTop: '1rem',
        }}>
          <SendCrypto {...this.containerOneProp} />
          <div style={{
            textAlign: 'center',
          }}>
            <Button style={{
              backgroundColor: 'black',
              margin: '1vw',
              width: '35vw',
              position: 'relative',
            }} variant="outlined"
              onClick={() => { this.sendTransaction() }}>De-Anonymize</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SendDeAnonymize;