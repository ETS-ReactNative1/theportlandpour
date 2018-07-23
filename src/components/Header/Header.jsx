/**
 * @file Header component
 * @description Global header and appbar
 * @author tm
 * @copyright Inspec Digital, LLC
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Home from '@material-ui/icons/Home';
import Info from '@material-ui/icons/Info';
import LocalBar from '@material-ui/icons/LocalBar';
import Menu from '@material-ui/icons/Menu';
import RssFeed from '@material-ui/icons/RssFeed';
import withStyles from '@material-ui/core/styles/withStyles';
import Navigation from 'components/Navigation';
import Tagline from 'components/Tagline';

const styles = theme => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: '200px'
  },
  toolbar: {
    background: theme.palette.common.white,
    flex: '1 1 auto',
    margin: '0 auto',
    maxWidth: theme.local.maxWidth,
    minWidth: '1px',
    position: 'relative',
    width: '100%'
  },
  brand: {
    padding: '12px 0'
  },
  header: {
    marginBottom: '12px',
    textAlign: 'center'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  navigation: {
    paddingTop: '24px'
  },
  tagline: {
    background: 'transparent',
    flexGrow: 1
  }
});

class Header extends Component {

  state = {
    drawer: false
  };

  toggleDrawer = () => {

    const drawer = !this.state.drawer;

    return this.setState({ drawer: drawer });

  }

  render() {

    const { classes } = this.props;

    return (
      <React.Fragment>
        <AppBar className={classes.appbar} position="fixed" color="default">
          <Toolbar className={classes.toolbar}>
            <Hidden lgUp>
              <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
                <Menu />
              </IconButton>
            </Hidden>
            <div className={classes.brand}>
              <Link to="/">
                <img src="/assets/images/brand/tpp.brand.md.png" alt=""/>
              </Link>
            </div>
            <Hidden mdDown>
              <Navigation className={classes.navigation} />
            </Hidden>
            <Hidden smDown>
              <div className={classes.tagline}>
                <Tagline />
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Drawer  open={this.state.drawer} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <List className={classes.drawer} component="nav" subheader={<ListSubheader>Menu</ListSubheader>}>
              <ListItem button component="a" href="/">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component="a" href="/page/1">
                <ListItemIcon>
                  <LocalBar />
                </ListItemIcon>
                <ListItemText primary="Cocktails" />
              </ListItem>
              <ListItem button component="a" href="/about">
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button component="a" href="https://blog.theportlandpour.com/rss/">
                <ListItemIcon>
                  <RssFeed />
                </ListItemIcon>
                <ListItemText primary="RSS Feed" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    );

  }

}

export default withStyles(styles)(Header);
