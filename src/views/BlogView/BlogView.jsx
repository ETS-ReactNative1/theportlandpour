/**
 * @file Blog view
 * @description Blog homepage
 * @author tm
 * @copyright Inspec Digital, LLC
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import blogActions from '../../actions/blogActions';
import Filter from '../../components/Filter';
import Footer from '../../components/Footer';
import Pager from '../../components/Pager';
import Posts from '../../components/Posts';
import pull from 'lodash/pull';
import blogConstants from '../../constants/blogConstants';
import blogHelper from '../../helpers/blogHelper';
import Helmet from 'react-helmet';

const frontload = async props => {
  const page = props.match.params.page;
  const paginationPage = props.blog.meta.pagination.page;
  const { posts } = props.blog;
  if(+page !== +paginationPage || posts.length === 0) {
    props.dispatch(blogActions.request(blogConstants.WAITING_POSTS));
    const posts = await blogActions.fetchPosts({page: page});
    await props.dispatch(posts);
  }
  if(props.blog.users.length === 0) {
    props.dispatch(blogActions.request(blogConstants.WAITING_USERS));
    const users = await blogActions.fetchUsers();
    await props.dispatch(users);
  }
}

const styles = theme => ({
  posts: {
    padding: '0 24px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  root: {
    margin: '0 auto',
    maxWidth: theme.local.maxWidth,
    paddingTop: theme.local.headerPadding,
    position: 'relative'
  },
  rootContent: {
    display: 'flex',
  },
  sidebar: {
    paddingBottom: '24px',
    paddingRight: '24px',
    width: '30%'
  },
  title: {
    paddingBottom: '24px',
    paddingLeft: '36px',
    paddingRight: '36px'
  }
});

/**
 * Blog view component
 * @extends Component
 */
class BlogView extends Component {

  componentDidMount() {

    this.historyUnlisten = this.props.history.listen((location, action) => {
      const path = location.pathname.split('/');
      const page = path[path.indexOf('page') + 1];
      //window.scrollTo(0, 0);
      return page ? this.props.dispatch(blogActions.getPosts({page: page})) : null;
    });

    if(this.props.blog.tags.length === 0) {
      this.props.dispatch(blogActions.getTags());
    }

  }

  componentWillUnmount() {

    return this.historyUnlisten();

  }

  getPostsBySpirit = (spirit, clear=false) => {

    const { selectedSpirits } = this.props.blog;

    let query = { page: 1 }

    if(clear) {
      pull(selectedSpirits, spirit);
    }
    else {
      selectedSpirits.push(spirit);
    }

    this.props.dispatch(blogActions.setSelectedSpirits(selectedSpirits));

    if(selectedSpirits.length) {
      query.filter = 'tags:[' + selectedSpirits.toString() + ']'
    }

    this.props.dispatch(blogActions.getPosts(query));

  }

  render() {

    const { classes, match } = this.props;
    const { meta, posts, selectedSpirits, tags, users, waiting } = this.props.blog;
    const { pagination } = meta;

    const progress = <LinearProgress />;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <Helmet>
            <title>{blogHelper.getTitle('Cocktails - Page ' + match.params.page)}</title>
            <link rel="canonical" href={blogHelper.getBaseUrl() + match.url} />
            <meta property="og:type" content="object" />
            <meta property="og:description" content={blogHelper.getDescription()} />
            <meta property="og:image" content={posts.length ? blogHelper.getBaseUrl() + posts[0].feature_image : null} />
            <meta property="og:image:alt" content={blogHelper.getTitle()} />
            <meta property="og:image:height" content="750" />
            <meta property="og:image:secure_url" content={posts.length ? blogHelper.getBaseUrl() + posts[0].feature_image : null} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="600" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:site_name" content={blogHelper.getTitle()} />
            <meta property="og:title" content={'Cocktails - page ' + match.params.page} />
            <meta property="og:url" content={blogHelper.getBaseUrl() + match.url} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={'Cocktails - page ' + match.params.page} />
            <meta name="twitter:description" content={blogHelper.getDescription()} />
            <meta name="twitter:image" content={posts.length ? blogHelper.getBaseUrl() + posts[0].feature_image : null} />
            <meta name="twitter:image:alt" content={blogHelper.getTitle()} />
          </Helmet>
          <div className={classes.rootContent}>
            <div className={classes.posts}>
              <Typography align="center" variant="headline">Cocktail posts</Typography>
              <Typography align="center" variant="subheading">Cocktail pictures, stories, and recipes featuring local ingredients</Typography>
              <Hidden smDown>
                <Filter getPostsBySpiritCallback={this.getPostsBySpirit} selectedSpirits={selectedSpirits} tags={tags} />
              </Hidden>
              <Pager pagination={pagination} />
              {waiting ? progress : null}
              <Posts posts={posts} users={users} />
              <Hidden smDown>
                <Filter getPostsBySpiritCallback={this.getPostsBySpirit} selectedSpirits={selectedSpirits} tags={tags} />
              </Hidden>
              <Pager pagination={pagination} />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );

  }

}

const mapStateToProps = state => {

  return state;

}

const styledComponent = withStyles(styles)(BlogView)

export default connect(mapStateToProps)(frontloadConnect(frontload, {onMount: true, onUpdate: false})(styledComponent));
