import React, { Component } from "react";
import { connect } from "react-redux";
import { haveASay } from "../../redux/actions/post-comment";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../../redux/actions/profile";
import { ChatBubbleOutlineRounded } from "@material-ui/icons";

class HeadBalloon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postText: ""
        };
    }
    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            postText: value
        });
    };
    postSomething = (e) => {
        e.preventDefault();
        const { postText } = this.state;
        if (postText === "") return;
        // make post to the backend;
        this.props.postSay(postText);
    };

    unfollowUser = () => {
        // this.props.unFollowUser()
        const { user, unfollowUser } = this.props;
        return unfollowUser(user._id);
    };

    followUser = () => {
        const { user, followUser } = this.props;
        return followUser(user._id);
    };
    render() {
        const { postText } = this.state;
        const { page, isAuthUser, user, relationship } = this.props;
        const { isMutual, isFollowing } = relationship ? relationship : {};
        const { name, nickname, _id } = user;
        const renderActions =
            page === "profile" && !isAuthUser ? (
                <div className='camp-relation-container'>
                    {isFollowing || isMutual ? (
                        <button
                            className='camp-relation camp-relation-unfollow'
                            onClick={this.unfollowUser}>
                            Unfollow
                        </button>
                    ) : (
                        <button
                            className='camp-relation camp-relation-follow'
                            onClick={this.followUser}>
                            Follow
                        </button>
                    )}
                    {isMutual && (
                        <Link to={`/chat/${_id}`}>
                            <ChatBubbleOutlineRounded color={"action"} />
                        </Link>
                    )}
                </div>
            ) : (
                <React.Fragment></React.Fragment>
            );
        return (
            <div className='camp-balloon-head'>
                <div className='camp-head-top'>
                    <div className='camp-user-avatar'></div>
                    <div className='camp-user-details'>
                        <h3>{`${name}`}</h3>
                        <p>{`@${nickname}`}</p>
                    </div>
                </div>
                {isAuthUser && (
                    <div className='camp-head-bottom'>
                        <form noValidate onSubmit={this.postSomething}>
                            <textarea
                                placeholder='Have a say'
                                value={postText}
                                onChange={this.handleInputChange}></textarea>
                            <button>Make post</button>
                        </form>
                    </div>
                )}

                {renderActions}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        postSay: (content) => {
            return dispatch(haveASay(content));
        },
        followUser: (id) => {
            return dispatch(followUser(id));
        },
        unfollowUser: (id) => {
            return dispatch(unfollowUser(id));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeadBalloon);
