import React, { Component } from "react";
import { connect } from "react-redux";
import {
    setViewProfile,
    getUserSays,
    getUserProfile,
    checkRelationship
} from "../../redux/actions/profile";

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
        return (
            <div>
                <h1>User profile</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
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
