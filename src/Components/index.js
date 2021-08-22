import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationBar from './Navigation'
import HomePage from './Home'
import ArticlePage from './Article'
import SignInPage from './Auth/signin'
import SignUpPage from './Auth/signup'

import * as ROUTES from '../Constants/routes'

import { signOut, signUp } from '../Action/auth'
import { searchPapers } from '../Action/papers'

const mapDispatchToProps = dispatch => {
    return {
        signUp: signUpCredentials => dispatch(signUp(signUpCredentials)),
        signOut: () => dispatch(signOut()),
        searchPapers: searchTerm => dispatch(searchTerm),
    }
}

const mapStateToProps = state => {
    return {
        auth: state.AuthReducer.auth,
    }
}

function ParentComponent (props) {
    return(
        <Router>
          <NavigationBar {...props} />
          <Route exact path={ROUTES.HOME} render={props => <HomePage {...props} />} />
          <Route path={ROUTES.ARTICLES} render={props => <ArticlePage {...props} />} />
          <Route path={ROUTES.SIGN_IN} render={props => <SignInPage {...props} />} />
          <Route path={ROUTES.SIGN_UP} render={props => <SignUpPage {...props} /> } />
        </Router>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentComponent)