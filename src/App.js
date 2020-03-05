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
            <BrowserRouter>
                {isverifyingauth ? (
                    <div className='App camp-loader'>
                        <h2>Konert</h2>
                        <p>Checking your ID...</p>
                    </div>
                ) : (
                    <div className='App'>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => <Home {...props}  />}
                            />
                            <Route
                                exact
                                path='/auth/signup'
                                render={(props) => <Signup {...props} user={user} />}
                            />
                            <Route
                                exact
                                path='/auth/login'
                                render={(props) => <Login {...props} user={user} />}
                            />
                            <Route
                                exact
                                path='/profile/:profile_id'
                                render={(props) => <Profile {...props}  />}
                            />
                            <Route
                                exact
                                path='/messages'
                                render={(props) => <Message {...props}  />}
                            />
                            <Route
                                exact
                                path='/chat/:friendid'
                                render={(props) => <Chat {...props}  />}
                            />

                            <Route
                                exact
                                path='/search'
                                render={(props) => <Search {...props}  />}
                            />
                            <Route
                                exact
                                path='/notifications'
                                render={(props) => <Notification {...props}  />}
                            />
                            <Route
                                exact
                                path='/view-post/:postid'
                                render={(props) => <ViewPost {...props}  />}
                            />
                        </Switch>
                    </div>
                )}
            </BrowserRouter>
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
