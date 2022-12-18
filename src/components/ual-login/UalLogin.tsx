import * as React from "react";
import { Ledger } from "ual-ledger";
import { Anchor } from "ual-anchor";
import { Lynx } from "ual-lynx";
// @ts-ignore
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import { JsonRpc } from "eosjs";
import { Button } from "@mui/material";
import { Wallet } from "../../assets/pkg/zeos_orchard";
import WalletManager, {
  ZeosSaplingAddressSession,
} from "../../services/WalletManager";
import { kylin, KylinConfig } from "../../config/EosNetworks";

const demoTransaction = {
  actions: [
    {
      account: "eosio.token",
      name: "transfer",
      authorization: [
        {
          actor: "", // use account that was logged in
          permission: "active",
        },
      ],
      data: {
        from: "", // use account that was logged in
        to: "example",
        quantity: "1.0000 EOS",
        memo: "UAL rocks!",
      },
    },
  ],
};

interface TransactionProps {
  ual: any;
}

interface TransactionState {
  activeUser: any;
  accountName: string;
  accountBalance: any;
  rpc: JsonRpc;
  zeosInfo: ZeosSaplingAddressSession;
}
const defaultState = {
  activeUser: null,
  accountName: "",
  accountBalance: null,
};

export class TransactionApp extends React.Component<
  TransactionProps,
  TransactionState
> {
  static displayName = "TransactionApp";

  constructor(public props: TransactionProps) {
    super(props);

    const {
      ual: { activeUser },
    } = this.props;

    this.state = {
      ...activeUser,
      rpc: new JsonRpc(
        `${KylinConfig.RPC_PROTOCOL}://${KylinConfig.RPC_HOST}:${KylinConfig.RPC_PORT}`
      ),
    };

    WalletManager.getInstance().then((wallet: WalletManager) => {
      this.setState({
        zeosInfo: wallet.getZeosActiveAddress(),
      });
    });

    this.updateAccountBalance().then((balance) =>
      this.setState({ accountBalance: balance })
    );
    this.updateAccountBalance = this.updateAccountBalance.bind(this);
    this.updateAccountName = this.updateAccountName.bind(this);
    this.renderTransferButton = this.renderTransferButton.bind(this);
    this.transfer = this.transfer.bind(this);
    this.renderModalButton = this.renderModalButton.bind(this);
  }

  public componentDidUpdate() {
    const {
      ual: { activeUser },
    } = this.props;
    if (activeUser && !this.state.activeUser) {
      console.log("Did Update");
      this.setState({ activeUser }, this.updateAccountName);

      WalletManager.getInstance().then(async (wallet: WalletManager) => {
        wallet.eosAccount = this.state.activeUser;
      });
    } else if (!activeUser && this.state.activeUser) {
      console.log("Did Update");

      this.setState(defaultState);
      WalletManager.getInstance().then(async (wallet: WalletManager) => {
        wallet.eosAccount = defaultState.activeUser;
      });
    }
  }

  public async updateAccountName(): Promise<void> {
    try {
      const accountName = await this.state.activeUser.getAccountName();
      this.setState({ accountName }, this.updateAccountBalance);
    } catch (e) {
      console.warn(e);
    }
  }

  public async updateAccountBalance(): Promise<void> {
    try {
      const account = await this.state.rpc.get_account(this.state.accountName);
      const accountBalance = account.core_liquid_balance;
      this.setState({ accountBalance });
    } catch (e) {
      console.warn(e);
    }
  }

  public async transfer() {
    const { accountName, activeUser } = this.state;
    demoTransaction.actions[0].authorization[0].actor = accountName;
    demoTransaction.actions[0].data.from = accountName;
    try {
      await activeUser.signTransaction(demoTransaction, { broadcast: true });
      await this.updateAccountBalance();
    } catch (error) {
      console.warn(error);
    }
  }

  public renderModalButton() {
    return (
      <Button
        style={{
          height: "40px",
          marginTop: "10px",
        }}
        role="button"
        variant="outlined"
        onClick={this.props.ual.showModal}
        className="ual-generic-button"
      >
        Login
      </Button>
    );
  }

  public renderTransferButton() {
    return (
      <Button
        style={{
          height: "40px",
          marginTop: "10px",
        }}
        role="button"
        variant="outlined"
        onClick={this.transfer}
        className="ual-generic-button"
      >
        Transfer
      </Button>
    );
  }

  public logout(): void {
    this.props.ual.logout();
    sessionStorage.clear();
    localStorage.clear();

    window.location.href = "/";
  }

  public renderLogoutBtn = () => {
    const {
      ual: { activeUser, activeAuthenticator },
    } = this.props;
    if (!!activeUser && !!activeAuthenticator) {
      return (
        <Button
          style={{
            height: "40px",
            marginTop: "10px",
          }}
          role="button"
          variant="outlined"
          onClick={() => {
            this.logout();
          }}
          className="ual-generic-button"
        >
          Logout
        </Button>
      );
    }
  };

  public render() {
    const {
      ual: { activeUser },
    } = this.props;

    const { accountBalance, accountName, zeosInfo } = this.state;
    const modalButton = !activeUser && this.renderModalButton();
    const loggedIn = accountName ? `Logged in as ${accountName}` : "";
    const myBalance = `Balance: ${accountBalance || "0"}`;
    const zeosInfoDetail = zeosInfo
      ? `Selected zeos address: ${
          zeosInfo.data!.publickey.substring(0, 15).concat("...") ||
          "No selected address"
        }`
      : "No zeos address selected";
    const transferBtn = accountBalance && this.renderTransferButton();

    return (
      <div
        style={{
          textAlign: "right",
          display: "inline-flex",
        }}
      >
        {console.log("THIS:STATE -> ", this.state)}
        {zeosInfoDetail !== "" && loggedIn ? (
          <h3 className="ual-subtitle">{zeosInfoDetail}&nbsp;|&nbsp;</h3>
        ) : null}
        {modalButton}
        {loggedIn !== "" ? (
          <h3 className="ual-subtitle">{loggedIn}&nbsp;|&nbsp;</h3>
        ) : null}
        {loggedIn !== "" ? (
          <h3 className="ual-subtitle">{myBalance}&nbsp;</h3>
        ) : null}
        {transferBtn}
        {this.renderLogoutBtn()}
      </div>
    );
  }
}

class UALLogin extends React.Component {
  public UalInformation = withUAL(TransactionApp);

  private appName: String = "Zeos Wallet";
  private ledger: Ledger = new Ledger([kylin]);
  private anchor: Anchor = new Anchor([kylin], { appName: "Zeos Wallet" });
  private lynx: Lynx = new Lynx([kylin]);

  constructor(public props: any, public wallet: Wallet) {
    super(props);
    
    this.UalInformation.displayName = "UalInformation";
  }

  public async initWallet() {
    var sender = (await WalletManager.getInstance()).wallet;
    var receiver = Wallet.new(
      "This is the receiver wallets seed string. It must be at least 32 characters long!"
    );

    var auth = [{ actor: "newstock1dex", permission: "active" }];
    var descs = [
      {
        action: {
          account: "eosio.token",
          name: "transfer",
          authorization: auth,
          data: '{"from":"newstock1dex", "to":"thezeostoken", "quantity":"1.0000 EOS", "memo":"miau"}',
        },
        zaction_descs: [],
      },
      {
        action: {
          account: "thezeostoken",
          name: "exec",
          authorization: [{ actor: "thezeostoken", permission: "active" }],
          data: "",
        },
        zaction_descs: [
          {
            za_type: 1, //ZA_MINTFT,
            to: sender.address(0),
            d1: 10000,
            d2: 1397703940,
            sc: 6138663591592764928,
            memo: "This is a test!",
          },
        ],
      },
    ];
  }

  public renderInfo() {
    return (
      <UALProvider
        chains={[kylin]}
        authenticators={[this.ledger, this.anchor, this.lynx]}
        appName={this.appName}
      >
        <this.UalInformation />
      </UALProvider>
    );
  }
  render() {
    return <div>{this.renderInfo()}</div>;
  }
}

export default UALLogin;
