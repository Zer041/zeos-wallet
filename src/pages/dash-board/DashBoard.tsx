import { Stack } from "@mui/material";
import * as React from "react";
import AddressInfo from "../../components/address-info/AddressInfo";
import { ContainerOneProps } from "../../components/containers/container-one/models/ContainerOnePropTypes";
import { ContainerTwoProps } from "../../components/containers/container-two/models/ContainerTwoProps";
import FundInfo from "../../components/fund-info/FundInfo";
import WalletManager from "../../services/WalletManager";

type DashBoardState = {
  containerOneProps: Array<ContainerOneProps>;
  containerTwoProps: Array<ContainerTwoProps>;
};
class DashBoard extends React.Component<{}, DashBoardState> {
  public containerTwoProps: Array<ContainerTwoProps> = [
    {
      address: {
        fontSize: "1.2rem",
        fontColor: "white",
        plainText: "z8sd80asd8aaxas0x8as0080sx213d1dd1d123d2141x2s9Aa",
      },
      zeosBalance: {
        fontSize: "1.2rem",
        fontColor: "yellow",
        symbol: "ZEOS",
        amount: "113.6453",
      },
      usdBalance: {
        fontSize: "0.9rem",
        fontColor: "gray",
        symbol: "USD",
        amount: "110.4653417",
      },
    },
    {
      address: {
        fontSize: "1.2rem",
        fontColor: "white",
        plainText: "z8412241142xzj6i93d8as0080sx213d1dd1d123d2141x2s9Aa",
      },
      zeosBalance: {
        fontSize: "1.2rem",
        fontColor: "yellow",
        symbol: "ZEOS",
        amount: "1904.6453",
      },
      usdBalance: {
        fontSize: "0.9rem",
        fontColor: "gray",
        symbol: "USD",
        amount: "1876.4653417",
      },
    },
  ];

  constructor(public props: any) {
    super(props);
    this.state = {
      containerOneProps: [],
      containerTwoProps: [],
    };
    this.getGeneralFundingInfo = this.getGeneralFundingInfo.bind(this);
  }

  private async getGeneralFundingInfo() {
    let walletManager = await WalletManager.getInstance();

    setTimeout(async () => {
      let zeosBalance = `${await walletManager.getZeosBalance()}`;
      let eosBalance = `${await walletManager.getEosBalance()}`;
      let usdBalance = `${await walletManager.getUsdBalance()}`;
      let dappServicesBalance = `${await walletManager.getDappServicesBalance()}`;

      const totalSaplingAddresses =
        await walletManager.getZeosSaplingAddresses();
      const saplingObject: any[] = [];

      console.log("TotalSaplingAddresses: ", totalSaplingAddresses);

      totalSaplingAddresses.forEach((address) => {
        console.log("Address: ", address);
        saplingObject.push({
          address: {
            fontSize: "1.2rem",
            fontColor: "white",
            plainText: `${address.alias ? 'Alias: ' + address.alias: ''} ${address.data!.publickey.substring(0, 25).concat('...')}`,
          },
          zeosBalance: {
            fontSize: "1.2rem",
            fontColor: "yellow",
            symbol: ``,
            amount: address.data!.zeosbalance,
            
          },
          usdBalance: {
            fontSize: "0.9rem",
            fontColor: "gray",
            symbol: ``,
            amount: address.data!.usdbalance,
          },
        });
        return saplingObject;
      });
      // console.log("Zeos Balance: " + zeosBalance)
      // console.log("Zeos Sapling Addresses: " + await walletManager.getZeosSaplingAddresses())

      this.setState({
        containerOneProps: [
          {
            top: {
              plainText: zeosBalance,
              fontSize: "1.2rem",
              fontColor: "yellow",
            },
            middle: {
              plainText: eosBalance,
              fontSize: "0.9rem",
              fontColor: "gray",
            },
            bottom: {
              plainText: dappServicesBalance,
              fontSize: "0.9rem",
              fontColor: "gray",
            },
          },
          {
            top: {
              plainText: eosBalance,
              fontSize: "1.2rem",
              fontColor: "yellow",
            },
            middle: {
              plainText: eosBalance,
              fontSize: "0.9rem",
              fontColor: "gray",
            },
            bottom: {
              plainText: usdBalance,
              fontSize: "0.9rem",
              fontColor: "gray",
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
      <div>
        <FundInfo {...this.state.containerOneProps} />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={3}
          style={{
            paddingTop: "1rem",
          }}
        >
          <span>Address</span>
          <span>Balance</span>
        </Stack>

        <hr />

        <AddressInfo {...this.state.containerTwoProps} />
      </div>
    );
  }
}

export default DashBoard;
