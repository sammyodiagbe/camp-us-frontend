import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";
import { connect } from "react-redux";
import { loadFeeds, setFeeds } from "../../redux/actions/post-comment";
import io from "socket.io-client";
import { baseUrl } from "../../helpers/api-end-points";
import { Redirect } from "react-router-dom";
import Placeholder from "../partials/placeholder";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feeds_socket: null
        };
    }
    componentDidMount() {
        this.props.loadFeeds();
        const { newsfeeds, user } = this.props;
        let feeds_socket = io.connect(`${baseUrl}/feeds`);
        feeds_socket.on("connect", () => {
            this.setState({
                feeds_socket
            });
            feeds_socket.on("got_new_feeds", (newfeeds) => {
                this.props.setFeeds(newfeeds);
            });
        });

        setInterval(() => {
            feeds_socket.emit("get_feeds_update", {
                oldFeeds: newsfeeds,
                authuserid: user._id
            });
        }, 500);
    }

    componentWillUnmount() {
        const { feeds_socket } = this.state;
        feeds_socket.disconnect();
        this.setState({
            feeds_socket: null
        });
    }
    static getDerivedStateFromProps = () => {};
    render() {
        const { user, isgettingsays } = this.props;
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    {isgettingsays ? (
                        <p style={{ color: "red" }}>Getting some data</p>
                    ) : (
                        // <Placeholder />
                        <React.Fragment>
                            <HeadBalloon isAuthUser={true} user={user} />
                            <Says says={this.props.newsfeeds.reverse()} />
                        </React.Fragment>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, conversation, interactions } = state;
    return {
        user: authentication.user,
        newsfeeds: conversation.newsfeeds,
        isgettingsays: interactions.isgettingsays
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadFeeds: () => {
            return dispatch(loadFeeds());
        },
        setFeeds: (feeds) => {
            return dispatch(setFeeds(feeds));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
