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
        const { newsfeeds, user } = this.props;

        if (!user) {
            return this.props.history.push("/auth/login");
        }
        if (newsfeeds.length <= 0) {
            this.props.loadFeeds();
        }
        if (typeof user._id != "undefined") {
            let feeds_socket = io.connect(`${baseUrl}/feeds`);
            feeds_socket.on("connect", () => {
                this.setState({
                    feeds_socket
                });

                feeds_socket.emit("connection_", user._id);
                feeds_socket.on("got_new_feeds", (newfeeds) => {
                    this.props.setFeeds(newfeeds.reverse());
                });
            });

            setInterval(() => {
                const { newsfeeds } = this.props;
                feeds_socket.emit("get_feeds_update", {
                    oldFeeds: newsfeeds,
                    authuserid: user._id
                });
            }, 500);
        }
    }

    componentWillUnmount() {
        const { feeds_socket } = this.state;
        if (feeds_socket) {
            feeds_socket.disconnect();
            this.setState({
                feeds_socket: null
            });
        }
    }
    render() {
        const { user, isgettingsays, isposting } = this.props;
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <React.Fragment>
                        <HeadBalloon
                            isAuthUser={true}
                            user={user}
                            isgettingsays={isgettingsays}
                            isposting={isposting}
                        />
                        <Says says={this.props.newsfeeds} />
                    </React.Fragment>
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
        isgettingsays: interactions.isgettingsays,
        isposting: interactions.isposting
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
