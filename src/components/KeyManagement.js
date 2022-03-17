import * as React from 'react'
import { useState, useEffect } from 'react'
import { binary_to_base58 } from 'base58-js'

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddIcon from '@material-ui/icons/Add';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { IconButton, Tooltip } from '@material-ui/core';
//import MoneyIcon from '@material-ui/icons/Money';
//import LocalAtmIcon from '@material-ui/icons/LocalAtm';
//import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function KeyManagement({keyPairs, selectedKey, onCreateNewKey, onKeySelect, onDeleteKey, onImportKey, zeosBalance})
{
  const [viewSK, setViewSK] = useState(false);

  function copyAddrToClipboard()
  {
      if(-1 === selectedKey)
      {
        console.log('Error: No address selected');
        return;
      }
      var addr = 'Z' + binary_to_base58(keyPairs[selectedKey].addr.h_sk.concat(keyPairs[selectedKey].addr.pk));
      navigator.clipboard.writeText(addr).then(function() {
          console.log('copied address to clipboard!');
      }, function(err) {
          console.error('Error: Could not copy address: ', err);
      });
  }

  function copySkToClipboard()
  {
      if(-1 === selectedKey)
      {
        console.log('Error: No Key selected');
        return;
      }
      var addr = 'S' + binary_to_base58(keyPairs[selectedKey].sk);
      navigator.clipboard.writeText(addr).then(function() {
          console.log('copied secret key to clipboard!');
      }, function(err) {
          console.error('Error: Could not copy secret key: ', err);
      });
  }

  function onViewSecretKey()
  {
    setViewSK(true);
  };
  
  function onCloseViewSecretKey()
  {
    setViewSK(false);
  };
  
  function onCloseViewSecretKeyAndCopy()
  {
    copySkToClipboard();
    setViewSK(false);
  };

  return (
    <div className='component' id='key-management'>
    <div className='header'><InputLabel>Key Management</InputLabel></div>
      <div className='column'>
        <div className='text-row'>
          <InputLabel htmlFor='key-input'>Secret Key:</InputLabel>
          <Input id='key-input' />
          <Button variant='contained' startIcon={<SaveAltIcon />} onClick={()=>onImportKey()}>Import</Button>
          <Button variant='contained' startIcon={<AddIcon />} onClick={()=>onCreateNewKey()}>New Random Key</Button>
        </div>
        <div className='text-row'>
          <InputLabel htmlFor='key-select'>Addresses:</InputLabel>
          <Select id='key-select' value={selectedKey} onChange={()=>onKeySelect()}>
            {-1 === selectedKey ?
            <MenuItem value={-1}><em>None</em></MenuItem> :
            keyPairs.slice(0).reverse().map((kp)=>{return(<MenuItem key={kp.id} value={kp.id}>Z{binary_to_base58(kp.addr.h_sk.concat(kp.addr.pk))}</MenuItem>)})}
          </Select>
          {-1 === selectedKey ? <></> : <div>
            <Tooltip title='copy address to clipboard'>
              <IconButton onClick={()=>copyAddrToClipboard()}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='view secret key of this address'>
              <IconButton onClick={onViewSecretKey}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='delete secret key and corresponding address'>
              <IconButton onClick={()=>onDeleteKey()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>}
        </div>
        <div>
          <Dialog open={viewSK} onClose={onCloseViewSecretKey}>
            <DialogTitle>Secret Key</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {-1 === selectedKey ? 'No Key selected' : 'S' + binary_to_base58(keyPairs[selectedKey].sk)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onCloseViewSecretKey} color="primary">Close</Button>
              {-1 === selectedKey ? <></> : 
              <Tooltip title='copy secret key to clipboard'>
                <IconButton onClick={onCloseViewSecretKeyAndCopy}>
                  <FileCopyIcon color="primary" autoFocus />
                </IconButton>
              </Tooltip>}
            </DialogActions>
          </Dialog>
        </div>
        <div className='text-row'>
          <InputLabel>ZEOS Balance: {zeosBalance}</InputLabel>
        </div>
      </div>
    </div>
  )
}

export default KeyManagement