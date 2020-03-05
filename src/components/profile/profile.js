import React, { Component } from "react";
import { connect } from "react-redux";
import {
    setViewProfile,
    getUserSays,
    getUserProfile,
    checkRelationship,
    setRelationship,
    setViewedUserProfileSays
} from "../../redux/actions/profile";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";
import io from "socket.io-client";
import { baseUrl } from "../../helpers/api-end-points";
import { Redirect } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthUsers: false,
            page: "profile",
            feeds_socket: null
        };
    }

    componentDidMount() {
        const { user, says } = this.props;
        const { _id: authUserId } = user;
        const { profile_id } = this.props.match.params;
        const feeds_socket = io.connect(`${baseUrl}/profile`);
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        if (authUserId === profile_id) {
            this.setState({
                isAuthUser: true,
                feeds_socket: feeds_socket
            });
            this.props.setViewProfile(user);
            if (says.length <= 0) {
                this.props.getUserSays(authUserId);
            }
        } else {
            // get the user profile
            this.setState({
                isAuthUser: false
            });
            this.props.getUserProfile(profile_id);
            this.props.checkRelationship(profile_id);
            setInterval(() => {
                feeds_socket.emit("get_relationship", { authUserId, profile_id });
            }, 500);
        }

        feeds_socket.on("connect", () => {
            this.setState({
                feeds_socket
            });
            feeds_socket.on("set_profile_feeds", (newfeeds) => {
                this.props.setFeeds(newfeeds);
            });

            feeds_socket.on("set_relationship", (relationship) => {
                this.props.setRelationship(relationship);
            });
        });

        setInterval(() => {
            const { isAuthUser } = this.state;
            feeds_socket.emit("get_profile_feeds", {
                oldFeeds: this.props.says,
                profile_id: isAuthUser ? authUserId : profile_id
            });
        }, 500);
    }

    componentWillUnmount() {
        const { feeds_socket } = this.state;
        feeds_socket.disconnect();

        this.setState({
            feeds_socket: null
        });

        this.props.setFeeds([]);
        this.props.setRelationship({});
        this.props.setViewProfile({});
    }

    render() {
        const {
            says,
            viewed_profile,
            isgettingprofile,
            isgettingsays,
            relationship,
            user
        } = this.props;

        const { isAuthUser, page } = this.state;
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    <React.Fragment>
                        <HeadBalloon
                            isAuthUser={isAuthUser}
                            page={page}
                            user={viewed_profile}
                            relationship={relationship}
                        />
                        <Says says={says} />
                    </React.Fragment>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, profile, interactions } = state;
    return {
        user: authentication.user,
        says: profile.viewed_user_says,
        viewed_profile: profile.viewed_user,
        isgettingprofile: interactions.isgettingprofiledetails,
        isgettingsays: interactions.isgettingsays,
        relationship: profile.viewedProfileRelationship
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setViewProfile: (user) => {
            return dispatch(setViewProfile(user));
        },
        getUserSays: (id) => {
            return dispatch(getUserSays(id));
        },
        getUserProfile: (id) => {
            return dispatch(getUserProfile(id));
        },
        checkRelationship: (authuserid, friendid) => {
            return dispatch(checkRelationship(authuserid, friendid));
        },
        setRelationship: (relationship) => {
            return dispatch(setRelationship(relationship));
        },
        setFeeds: (feeds) => {
            return dispatch(setViewedUserProfileSays(feeds));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
