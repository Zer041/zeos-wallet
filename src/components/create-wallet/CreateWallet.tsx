import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import WalletManager from "../../services/WalletManager";
import UALLogin from "../ual-login/UalLogin";
var randomWords = require("random-words");

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  p: 0,
  m: 0,
  bgcolor: "black",
  minWidth: "100%",
  margin: "auto",
  borderRadius: 1,
  color: "white",
};

interface WalletProps {
  value: string;
  walletValid: boolean;
  ualValid: boolean;
}

export class CreateWallet extends React.Component<{}, WalletProps> {
  public walletValid: boolean = false;
  public ualValid: boolean = false;

  constructor(props: WalletProps) {
    super(props);
    this.state = {
      walletValid: sessionStorage.getItem("seedPhrase")?.length ? true : false,
      ualValid: localStorage.getItem("UALInvalidateAt")?.length ? true : false,
      value: ""
    };
    if(this.state.walletValid && this.state.ualValid) {
      window.location.reload();
    }
    this.generateSeedphrase = this.generateSeedphrase.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    sessionStorage.setItem("seedPhrase", this.state.value);
    WalletManager.getInstance().then((wallet) => {
      wallet.createZeosSaplingAddress();
      window.location.href = '/';
    });
  }

  generateSeedphrase(event: any) {
    this.setState({ value: randomWords(15).join(" ") });
  }

  renderWalletCreation() {
    return (
      <div id="wallet-creation">
        <div
          style={{
            paddingBottom: "1%",
            width: "100%",
            textAlign: "left",
          }}
        >
          <TextField
            style={{
              width: "100%",
              marginTop: "1%",
            }}
            value={this.state.value}
            onChange={this.handleChange}
            id="filled-basic"
            label="Seed Phrase"
            multiline
            rows={5}
            variant="outlined"
            color="primary"
            focused
          />
        </div>

        <Button
          style={{
            height: "40px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          role="button"
          variant="outlined"
          onClick={this.generateSeedphrase}
          className="ual-generic-button"
        >
          Random
        </Button>

        <Button
          style={{
            height: "40px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          role="button"
          variant="outlined"
          onClick={() => navigator.clipboard.writeText(this.state.value)}
          className="ual-generic-button"
        >
          Copy
        </Button>

        <hr />

        <Button
          style={{
            height: "40px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          role="button"
          variant="outlined"
          onClick={this.handleSubmit}
          className="ual-generic-button"
        >
          Create
        </Button>

        <Button
          style={{
            height: "40px",
            marginTop: "10px",
            marginLeft: "10px",
            marginRight: "10px"
          }}
          role="button"
          variant="outlined"
          onClick={this.handleChange}
          type="submit"
          className="ual-generic-button"
        >
          Open
        </Button>
      </div>
    );
  }

  renderUalValidation() {
    return (
      <div id="wallet-creation">
       <UALLogin />
      </div>
    );
  }

  renderData = () => {
    return (
      <form
        style={{
          margin: "auto",
          display: "grid",
        }}>
        {!this.state.walletValid && this.state.ualValid ? (
          this.renderWalletCreation()
        ) : (
          this.state.walletValid ? (
          <span>Wallet already created!</span>) : null
        )}
        
        {!this.state.ualValid && !this.state.walletValid ? (
          this.renderUalValidation()
        ) : (
          !this.state.ualValid ? (
            this.renderUalValidation()) : null
        )}
      </form>
    );
  };

  render() {
    return (
      <div>
        <Box sx={containerStyle} maxWidth="sm">
          {this.renderData()}
        </Box>
      </div>
    );
  }
}
