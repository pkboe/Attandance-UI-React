import { AppBar as MuiAppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useUser } from '../Hooks/UseUser';

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { user, setAccessToken } = useUser();
  const { classes } = props;

  function logout() {
    setAccessToken(null);
  }

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {user.name ? user.name : 'Please, log in'}
        </Typography>
        {user.name && <Button color="inherit" onClick={logout}>Log Out</Button>}
      </Toolbar>
    </MuiAppBar>
  );
}

export default withStyles(styles)(ButtonAppBar);
