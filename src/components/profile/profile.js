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

        this.state = {
            isAuthUsers: false,
            page: "profile"
        };
    }

    componentDidMount() {
        const { user } = this.props;
        const { _id: authUserId } = user;
        const { profile_id } = this.props.match.params;
        console.log(profile_id);
        if (authUserId === profile_id) {
            this.setState({
                isAuthUser: true
            });
            this.props.setViewProfile(user);
            this.props.getUserSays(authUserId);
        } else {
            // get the user profile
            this.setState({
                isAuthUser: false
            });
            this.props.getUserProfile(profile_id);
            this.props.checkRelationship(profile_id);
        }
    }

    render() {
        const { says, viewed_profile, isgettingprofile, isgettingsays, relationship } = this.props;

        const { isAuthUser, page } = this.state;
        return (
            <React.Fragment>
                <NavigationBar />
                <div className='camp-main-content'>
                    {isgettingsays || isgettingprofile ? (
                        <p>Getting details hold on</p>
                    ) : (
                        <React.Fragment>
                            <HeadBalloon
                                isAuthUser={isAuthUser}
                                page={page}
                                user={viewed_profile}
                                relationship={relationship}
                            />
                            <Says says={says} />{" "}
                        </React.Fragment>
                    )}
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
