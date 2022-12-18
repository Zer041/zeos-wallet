import { Button } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import { ContainerOneProps } from "../../../components/containers/container-one/models/ContainerOnePropTypes";
import FundInfo from "../../../components/fund-info/FundInfo";
import SendCrypto from "../../../components/send-crypto/SendCrypto";
import WalletManager from "../../../services/WalletManager";

interface SendState {
  items: number[];
  containerOneProps: Array<ContainerOneProps>;
}

class SendHome extends React.Component<{}, SendState> {
  public containerOneProp: Array<ContainerOneProps> = [
    {
      top: {
        plainText: "Spendable Funds",
        fontSize: "1rem",
        fontColor: "white",
      },
      middle: {
        plainText: "ZEOS 113.6453",
        fontSize: "1.2rem",
        fontColor: "yellow",
      },
      bottom: {
        fontSize: "0.9rem",
        fontColor: "gray",
        plainText: "USD --",
      },
    },
    {
      top: {
        plainText: "All Funds",
        fontSize: "1rem",
        fontColor: "white",
      },
      middle: {
        plainText: "EOS 1440.4155",
        fontSize: "1.2rem",
        fontColor: "yellow",
      },
      bottom: {
        fontSize: "0.9rem",
        fontColor: "gray",
        plainText: "USD --",
      },
    },
  ];

  constructor(props: any) {
    super(props);
    this.state = {
      containerOneProps: [],
      items: [],
    };
    this.getGeneralFundingInfo = this.getGeneralFundingInfo.bind(this);
  }

  private async getGeneralFundingInfo() {
    let walletManager = await WalletManager.getInstance();

    setTimeout(async () => {
      let zeosBalance = `${await walletManager.getZeosBalance()}`;
      let eosBalance = `${await walletManager.getEosBalance()}`;

      console.log("Zeos Balance: " + zeosBalance)
      // console.log("Zeos Sapling Addresses: " + await walletManager.getZeosSaplingAddresses())

      this.setState({
        containerOneProps: [
            {
                top: {
                  plainText: "Spendable Funds",
                  fontSize: "1rem",
                  fontColor: "white",
                },
                middle: {
                  plainText: zeosBalance,
                  fontSize: "1.2rem",
                  fontColor: "yellow",
                },
                bottom: {
                  fontSize: "0.9rem",
                  fontColor: "gray",
                  plainText: "USD --",
                },
              },
              {
                top: {
                  plainText: "All Funds",
                  fontSize: "1rem",
                  fontColor: "white",
                },
                middle: {
                  plainText: eosBalance,
                  fontSize: "1.2rem",
                  fontColor: "yellow",
                },
                bottom: {
                  fontSize: "0.9rem",
                  fontColor: "gray",
                  plainText: "USD --",
                },
              },
        ],
      });
    }, 750);
  }

  componentDidMount(): void {
    this.getGeneralFundingInfo();
  }

  componentDidUpdate(): void {
    this.getGeneralFundingInfo();
  }


  addTransaction = () => {
    let dateTime = new Date().getTime();
    console.log(dateTime);
    this.state.items.push(dateTime);
    this.setState({ items: this.state.items });
  };

  sendTransaction = () => {
    console.log(`(${this.state.items.length + 1}) Transactions sent`);
  };

  removeTransaction = (index: number) => {
    console.log(index);
    this.state.items.splice(this.state.items.indexOf(index, 0), 1);
    this.setState({ items: this.state.items });
  };

  render() {
    return (
      <div>
        <FundInfo {...this.state.containerOneProps} />

        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            style={{
              backgroundColor: "black",
              margin: "1vw",
              position: "relative",
              right: 0,
            }}
            variant="outlined"
            onClick={() => {
              this.addTransaction();
            }}
          >
            New Transaction
          </Button>

          <Button
            style={{
              backgroundColor: "black",
              margin: "1vw",
              position: "relative",
              right: 0,
            }}
            variant="outlined"
            onClick={() => {
              this.sendTransaction();
            }}
          >
            Send
          </Button>
        </div>

        <SendCrypto
          style={{
            marginBottom: "1rem",
          }}
          {...this.containerOneProp}
        />
        {this.state.items.map((value, index) => {
          return (
            <div
              style={{
                backgroundColor: "black",
                marginTop: "1rem",
              }}
              key={value}
            >
              <SendCrypto {...this.containerOneProp} />

              <Button
                style={{
                  marginBottom: "1rem",
                }}
                variant="outlined"
                onClick={() => {
                  this.removeTransaction(value);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SendHome;
