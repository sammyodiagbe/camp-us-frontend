import React, { Component } from "react";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from "@material-ui/icons";
import NavigationBar from "../partials/navigation";
import likeSound from "../../assets/audio/get-outta-here.ogg";
import { likeOrUnlike, getViewedPostData, setViewedPost } from "../../redux/actions/post-comment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../styles/main/view-post.css";

class ViewPost extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        console.log("fetching post data ");
        const { postid } = this.props.match.params;
        this.props.getPost(postid);
    }
    render() {
        const { say, isgettingsay } = this.props;

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
                                <div className='camp-say-reaction'>
                                    <button
                                        onClick={() => {
                                            let sound = new Audio(likeSound);
                                            sound
                                                .play()
                                                .then(() => {
                                                    sound.remove();
                                                })
                                                .catch((err) => console.log(err));
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
        isgettingsay: interactions.isgettingsinglesay
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeOrUnlike: (postid) => {
            return dispatch(likeOrUnlike(postid));
        },
        getPost: (postid) => {
            return dispatch(getViewedPostData(postid));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
