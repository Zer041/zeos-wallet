import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter as Router } from "react-router-dom";
import PersistentDrawerLeft from './components/persistent-drawer/PersistentDrawerLeft';
import { ThemeProvider, createTheme, PaperProps, Button } from '@mui/material';
import Popup from 'reactjs-popup';
import { CreateWallet } from './components/create-wallet/CreateWallet';

export const ThemeOptions = {
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
          width: '100%',
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'white',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'white',
        }
      }
    }
  },
  palette: {
    primary: {
      light: "#4a4a4a",
      main: "#eeff00",
      dark: "#000000",
    },
    secondary: {
      light: "#000000",
      main: "#000000",
      dark: "#000000",
    },
  }
};

const theme = createTheme(ThemeOptions);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const contentStyle = {
  width: '100vw',
};
const overlayStyle = {
  background: 'rgba(0,0,0,0.8)',
  width: '100vw',
  color: '#f4f4f4'
};
const arrowStyle = {
  color: '#000'
};
const modal = true;

const renderPopup = () => {
  if (!sessionStorage.getItem('seedPhrase')
        || !sessionStorage.getItem('saplingAddresses')
        || !localStorage.getItem('UALInvalidateAt')) {
    return (
      <div style={{
        background:'black',
        width:'100vw',
        height:'100vh',
        textAlign:'center',
        lineHeight:'100vh'
      }}>
      <Popup
        trigger={(
          <Button style={{
            height: '40px',
            marginTop: '10px',
          }}
            role='button'
            variant="outlined"
            className='ual-generic-button'>Create Wallet</Button>
          )}
        {...{ modal, overlayStyle, contentStyle, arrowStyle }}
      >
        <span style={{
          margin: '12%'
        }}>
          <CreateWallet></CreateWallet>
        </span>
      </Popup>
      </div>
      )
  } else {
    return (
      <ProSidebarProvider>
        <Router>
          <PersistentDrawerLeft>
            <App />
          </PersistentDrawerLeft>
        </Router>
      </ProSidebarProvider>
    )
  }
}
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {renderPopup()}
    </ThemeProvider>
  </React.StrictMode>
);

