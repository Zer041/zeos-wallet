import { Box, Button } from "@mui/material";
import * as React from "react";
import AddressInfo from "../../../components/address-info/AddressInfo";
import { ContainerOneProps } from "../../../components/containers/container-one/models/ContainerOnePropTypes";
import { ContainerTwoProps } from "../../../components/containers/container-two/models/ContainerTwoProps";
import ReceiveInfo from "../../../components/receive-info/ReceiveInfo";
import WalletManager, {
  ZeosSaplingAddressSession,
} from "../../../services/WalletManager";

const containerStyle = {
  display: "block",
  justifyContent: "space-between",
  p: 0,
  m: 0,
  paddingBottom: "1rem",
  bgcolor: "black",
  minWidth: "100%",
  margin: "auto",
  borderRadius: 1,
  color: "white",
};

interface ReceiveHomeState {
  containerOneProps: Array<ContainerOneProps>;
  containerTwoProps: Array<ContainerTwoProps>;
}
class ReceiveHome extends React.Component<{}, ReceiveHomeState> {
  public walletManager: WalletManager | undefined;

  constructor(props: ReceiveHomeState) {
    super(props);
    this.state = {
      containerOneProps: [],
      containerTwoProps: [],
    };
    WalletManager.getInstance().then(wallet => this.walletManager = wallet);
    this.getGeneralFundingInfo = this.getGeneralFundingInfo.bind(this);
  }

  private async getGeneralFundingInfo() {
    setTimeout(async () => {
      const activeAddress = this.walletManager!.getZeosActiveAddress();
      const totalSaplingAddresses =
      this.walletManager!.getZeosSaplingAddresses();
      const saplingObject: any[] = [];

      console.log("TotalSaplingAddresses: ", totalSaplingAddresses);

      totalSaplingAddresses.forEach((address: ZeosSaplingAddressSession) => {
        saplingObject.push({
          address: {
            fontSize: "1.2rem",
            fontColor: "white",
            plainText: address.data?.publickey,
          },
          zeosBalance: {
            fontSize: "1.2rem",
            fontColor: "yellow",
            plainText: address.data?.zeosbalance,
          },
          usdBalance: {
            fontSize: "0.9rem",
            fontColor: "gray",
            plainText: address.data?.usdbalance,
          },
        });

        return saplingObject;
      });

      this.setState({
        containerOneProps: [
          {
            top: {
              fontSize: "1rem",
              fontColor: "white",
              plainText: `Public KEY: ${activeAddress.data!.publickey}`,
              style: {
                marginTop: "3vh",
                paddingBottom: "20vh",
                wordBreak: "break-all",
              },
            },
            middle: {
              fontSize: "1.2rem",
              fontColor: "yellow",
              plainText: `${activeAddress.data!.zeosbalance}`,
            },
            bottom: {
              fontSize: "0.9rem",
              fontColor: "gray",
              plainText: `${activeAddress.data!.usdbalance}`,
            },
            globalStyle: {
              textAlign: "left",
            },
          },
          {
            top: {
              plainText: "QR Code",
              fontSize: "1rem",
              fontColor: "white",
              style: {
                paddingBottom: "5%",
              },
            },
            middle: {
              fontSize: "1.2rem",
              fontColor: "yellow",
              plainText: "",
            },
            bottom: {
              fontSize: "0.9rem",
              fontColor: "gray",
              qrCode: activeAddress.data!.publickey,
            },
            globalStyle: {
              textAlign: "center",
            },
          },
        ],
        containerTwoProps: saplingObject,
      });
    }, 750);
  }

  componentDidMount(): void {
    this.getGeneralFundingInfo();
  }

  componentDidUpdate(): void {
    this.getGeneralFundingInfo();
  }

  render() {
    return (
      <Box sx={containerStyle}>
        <ReceiveInfo {...this.state.containerOneProps}></ReceiveInfo>
        <hr />
        <div>
          <Button
            style={{
              height: "40px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
            role="button"
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(
                this.walletManager!.getZeosActiveAddress().data!.publickey
              );
            }}
            className="ual-generic-button"
          >
            Copy Address
          </Button>
          <Button
            style={{
              height: "40px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
            role="button"
            variant="outlined"
            onClick={() => {
              navigator.clipboard.writeText(
                this.walletManager!.getZeosActiveAddress().data!.publickey
              );
            }}
            className="ual-generic-button"
          >
            Export Private Key
          </Button>
          <Button
            style={{
              height: "40px",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "1rem",
            }}
            role="button"
            variant="outlined"
            onClick={() => {
              console.log(this.walletManager!.wallet);
              console.log(this.walletManager!.getCurrencyStats())
              navigator.clipboard.writeText(
                'asd'
              );
            }}
            className="ual-generic-button"
          >
            Export Viewing Key
          </Button>
        </div>

        <hr />

        <AddressInfo {...this.state.containerTwoProps} />

        <Button
          style={{
            height: "40px",
            marginTop: "10px",
            marginRight: "1rem",
          }}
          role="button"
          variant="outlined"
          onClick={() => {
            WalletManager.getInstance().then((wallet) => wallet.createZeosSaplingAddress());
          }}
          className="ual-generic-button"
        >
          Create Zeos Address
        </Button>
      </Box>
    );
  }
}

export default ReceiveHome;
