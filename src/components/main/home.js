import React, { Component } from "react";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";
import { connect } from "react-redux";
import { loadFeeds, setFeeds } from "../../redux/actions/post-comment";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import { baseUrl } from "../../helpers/api-end-points";

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
        const { user } = this.props;
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <HeadBalloon isAuthUser={true} user={user} />
                    <Says says={this.props.newsfeeds.reverse()} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, conversation } = state;
    return {
        user: authentication.user,
        newsfeeds: conversation.newsfeeds
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
