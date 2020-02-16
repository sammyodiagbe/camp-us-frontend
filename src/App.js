import React, { Component } from "react";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/authentication/signup";
import Login from "./components/authentication/login";
import Profile from "./components/profile/profile";
import Home from "./components/main/home";
import { verifyUserAuthentication } from "./redux/actions/auth-actions";
import "./styles/main/main.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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
                        <Route exact path='/' component={Home} />
                        <Route exact path='/auth/signup' component={Signup} />
                        <Route exact path='/auth/login' component={Login} />
                        <Route exact path='/profile/:profile_id' component={Profile} />
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
