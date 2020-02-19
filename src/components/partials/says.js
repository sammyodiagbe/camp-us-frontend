import React from "react";
import { FavoriteOutlined, ChatBubbleOutlineOutlined } from "@material-ui/icons";
import { connect } from "react-redux";
import { likeOrUnlike } from "../../redux/actions/post-comment";

const Says = (props) => {
    const { says, likeOrUnlike } = props;
    const renderSays = says.map((say, index) => {
        const { content, said_by, _id } = say;
        const { firstname, lastname, nickname } = said_by;
        return (
            <div className='camp-a-say' key={index}>
                <div className='camp-say-top'>
                    <div className='camp-say-talker'></div>
                    <div className='camp-say-talker-details'>
                        <h4>{`${firstname} ${lastname}`}</h4>
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
                                console.log("hello");
                                likeOrUnlike(_id);
                            }}>
                            2.8k{" "}
                            <FavoriteOutlined
                                fontSize='small'
                                color='secondary'
                                className='camp-react'
                            />
                        </button>
                        <button>
                            15 <ChatBubbleOutlineOutlined fontSize='small' className='camp-react' />
                        </button>
                    </div>
                </div>
            </div>
        );
    });
    return <div className='camp-render-says'>{renderSays}</div>;
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeOrUnlike: (postid) => {
            return dispatch(likeOrUnlike(postid));
        }
    };
};
export default connect(null, mapDispatchToProps)(Says);
