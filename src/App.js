import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Signup from "./components/authentication/signup";
import Login from "./components/authentication/login";
import Profile from "./components/profile/profile";
import Home from "./components/main/home";
import "./styles/main/main.css";
import Message from "./components/main/message";
import Chat from "./components/main/chat";
import Search from "./components/main/search";
import Notification from "./components/main/notification";
import ViewPost from "./components/main/view-post";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    render() {
        const { isverifyingauth, Socket, user } = this.props;
        return (
            <React.Fragment>
                {isverifyingauth ? (
                    <div className='App'>Verifying authentication</div>
                ) : (
                    <BrowserRouter>
                        <div className='App'>
                            <Switch>
                                <Route
                                    exact
                                    path='/'
                                    render={(props) => <Home {...props} Socket={Socket} />}
                                />
                                <Route exact path='/auth/signup' component={Signup} />
                                <Route exact path='/auth/login' component={Login} />
                                <Route
                                    exact
                                    path='/profile/:profile_id'
                                    render={(props) => <Profile {...props} Socket={Socket} />}
                                />
                                <Route
                                    exact
                                    path='/messages'
                                    render={(props) => <Message {...props} Socket={Socket} />}
                                />
                                <Route
                                    exact
                                    path='/chat/:friendid'
                                    render={(props) => <Chat {...props} Socket={Socket} />}
                                />

                                <Route
                                    exact
                                    path='/search'
                                    render={(props) => <Search {...props} Socket={Socket} />}
                                />
                                <Route
                                    exact
                                    path='/notifications'
                                    render={(props) => <Notification {...props} Socket={Socket} />}
                                />
                                <Route
                                    exact
                                    path='/view-post/:postid'
                                    render={(props) => <ViewPost {...props} Socket={Socket} />}
                                />
                            </Switch>
                        </div>
                    </BrowserRouter>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { interactions, authentication } = state;
    return {
        isverifyingauth: interactions.isverifyingauthentication,
        user: authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
