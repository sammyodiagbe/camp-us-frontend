import React, { Component } from "react";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from "@material-ui/icons";
import NavigationBar from "../partials/navigation";
import likeSound from "../../assets/audio/get-outta-here.ogg";
import { likeOrUnlike, getViewedPostData, addComment } from "../../redux/actions/post-comment";
import { connect } from "react-redux";
import "../../styles/main/view-post.css";
import { Redirect, Link } from "react-router-dom";

class ViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: ""
        };
    }
    componentDidMount() {
        const { postid } = this.props.match.params;
        this.props.getPost(postid);
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            comment: value
        });
    };

    comment = (e) => {
        e.preventDefault();
        const { _id } = this.props.say;
        const { comment } = this.state;
        if (comment.trimRight() === "" || comment.trimRight() === "") return;
        this.props.comment(comment, _id);
        this.setState({
            comment: ""
        });
    };
    render() {
        const { say, isgettingsay, authuser } = this.props;
        const { comment } = this.state;
        if (!authuser) {
            return <Redirect to='/auth/login' />;
        }
        if (isgettingsay) {
            return (
                <React.Fragment>
                    <NavigationBar />
                    <div className='camp-main-content'>
                        <p>Fetching data</p>
                    </div>
                </React.Fragment>
            );
        } else if (typeof say.said_by != "undefined") {
            const { content, said_by, _id: postid, likes, comments } = say;
            const { nickname, name, _id } = said_by;
            return (
                <React.Fragment>
                    <NavigationBar />
                    <div className='camp-main-content'>
                        <div className='camp-a-say'>
                            <div className='camp-say-top'>
                                <div className='camp-say-talker'></div>
                                <div className='camp-say-talker-details'>
                                    <h4>
                                        <Link to={`/profile/${_id}`}>{`${name}`}</Link>
                                    </h4>
                                    <p>{`@${nickname}`}</p>
                                </div>
                                <div className='camp-say-time'>
                                    <p>just now</p>
                                </div>
                            </div>

                            <div className='camp-say-bottom'>
                                <div className='camp-say-say'>
                                    <p>{content}</p>
                                </div>
                                <div className='camp-comments'>
                                    {comments.length
                                        ? comments.map((comment, index) => {
                                              const { body, said_by } = comment;
                                              return <p key={index}>{body}</p>;
                                          })
                                        : null}
                                </div>
                                <div className='camp-say-comment-box'>
                                    <form noValidate onSubmit={this.comment}>
                                        <textarea
                                            placeholder='your comment'
                                            value={comment}
                                            onChange={this.handleInputChange}></textarea>
                                        <button>comment</button>
                                    </form>
                                </div>
                                <div className='camp-say-reaction'>
                                    <button
                                        onClick={() => {
                                            let sound = new Audio(likeSound);
                                            sound
                                                .play()
                                                .then(() => {
                                                    sound.remove();
                                                })
                                                .catch((err) => {});
                                            likeOrUnlike(_id);
                                        }}>
                                        {likes.length}
                                        <FavoriteOutlined
                                            fontSize='small'
                                            color='secondary'
                                            className='camp-react'
                                        />
                                    </button>
                                    <button to={{ pathname: `/view-post/${postid}`, say }}>
                                        {comments.length}{" "}
                                        <ChatBubbleOutlineOutlined
                                            fontSize='small'
                                            className='camp-react'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <p>Ooops something is broken</p>
                </React.Fragment>
            );
        }
    }
}
const mapStateToProps = (state) => {
    const { conversation, interactions } = state;

    return {
        say: conversation.viewedPost,
        isgettingsay: interactions.isgettingsinglesay,
        authuser: state.authentication.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeOrUnlike: (postid) => {
            return dispatch(likeOrUnlike(postid));
        },
        getPost: (postid) => {
            return dispatch(getViewedPostData(postid));
        },
        comment: (comment, postid) => {
            return dispatch(addComment(comment, postid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
