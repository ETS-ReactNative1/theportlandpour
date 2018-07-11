import React from 'react';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';
import { ScrollContext } from 'react-router-scroll-4';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import {
  Button,
  CssBaseline,
  Snackbar
} from '@material-ui/core';
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from '@material-ui/core/styles';
import { blogActions } from 'actions';
import { themeHelper } from 'helpers';
import {
  AboutView,
  BarView,
  BlogView,
  ContactView,
  HomeView,
  PostView
} from 'views';
import {
  Header,
  WithTracker
} from 'components';
import './App.css';

const theme = createMuiTheme(themeHelper.getTheme());

const styles = theme => ({
  wrapper: {
    width: '100%'
  }
});

const ga = {
  trackingId: 'UA-98891622-2',
  gaOptions: {
    cookieDomain: 'auto'
  }
}

const AppRoot = props => {

  const actionCallback = () => {
    return props.dispatch(blogActions.clearMessaging());
  }

  const { classes } = props;

  ReactGA.initialize(ga);

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.wrapper}>
          <BrowserRouter>
            <ScrollContext>
              <span>
                <Header />
                <Switch>
                  <Route path="/" exact component={WithTracker(HomeView)} />
                  <Route path="/page/:page" component={WithTracker(BlogView)} />
                  <Route path="/post/:slug" component={WithTracker(PostView)} />
                  <Route path="/about" component={WithTracker(AboutView)} />
                  <Route path="/build-your-bar" component={WithTracker(BarView)} />
                  <Route path="/contact" component={WithTracker(ContactView)} />
                </Switch>
              </span>
            </ScrollContext>
          </BrowserRouter>
        </div>
        <Snackbar open={props.message ? true : false}
                  message={props.message}
                  autoHideDuration={6000}
                  action={<Button onClick={actionCallback} color="secondary" size="small">Dismiss</Button>}
                  onClose={actionCallback} />
      </MuiThemeProvider>
    </React.Fragment>
  );

}

const mapStateToProps = state => {

  return state.blog.messaging;

};

const App = withStyles(styles)(AppRoot);

export default connect(mapStateToProps)(App);
