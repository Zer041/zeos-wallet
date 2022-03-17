import * as React from 'react'
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

function UALLogin({ ual: { activeUser, activeAuthenticator, logout, showModal }, appActiveUser, username, zeosBalance, onChange })
{
    if(activeUser && !appActiveUser)
    {
        onChange(activeUser);
    }
    else if(!activeUser && appActiveUser)
    {
        onChange(null);
    }

    // TODO: id is used double because there are two UALLogins
    return (
      <div className='component' id='ual-login'>
      <div className='header'><InputLabel>EOS Account Login</InputLabel></div>
        <div className='column'>
          <div className='text-row'>
            {
              !!activeUser && !!activeAuthenticator ? 
              <Button variant='contained' onClick={logout}>Logout</Button> : 
              <Button variant='contained' onClick={showModal}>UAL Modal</Button>
            }
            <InputLabel>EOS Account: {appActiveUser ? username : '<disconnected>'}</InputLabel>
            <InputLabel>ZEOS Balance: {appActiveUser ? zeosBalance : '0'}</InputLabel>
          </div>
        </div>
      </div>
    );
}

export default UALLogin