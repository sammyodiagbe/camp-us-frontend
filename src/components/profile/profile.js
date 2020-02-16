import React, { Component } from "react";
import { connect } from "react-redux";
import {
    setViewProfile,
    getUserSays,
    getUserProfile,
    checkRelationship
} from "../../redux/actions/profile";
import NavigationBar from "../partials/navigation";
import HeadBalloon from "../partials/head";
import Says from "../partials/says";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const { user } = this.props;
        const { _id: authUserId } = user;
        const { profile_id } = this.props.match.params;
        if (authUserId === profile_id) {
            this.props.setViewProfile(user);
            this.props.getUserSays(authUserId);
        } else {
            // get the user profile
            this.props.getUserProfile(profile_id);
            this.props.checkRelationship(authUserId, profile_id);
        }
    }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <NavigationBar />
                <HeadBalloon />
                <Says />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication, profile } = state;
    return {
        user: authentication.user,
        says: profile.viewed_user_says
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
