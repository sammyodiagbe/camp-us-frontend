import React, { Component } from "react";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/authentication/signup";
import Login from "./components/authentication/login";
import { verifyUserAuthentication } from "./redux/actions/auth-actions";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // verify user auth
        this.props.verifyAuthentication();
    }
    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Switch>
                        <Route exact path='/auth/signup' component={Signup} />
                        <Route exact path='/auth/login' component={Login} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyAuthentication: () => {
            return dispatch(verifyUserAuthentication());
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
