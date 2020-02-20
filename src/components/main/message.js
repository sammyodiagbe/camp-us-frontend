import React, { useEffect } from "react";
import "../../styles/main/main.css";
import NavigationBar from "../partials/navigation";
import { connect } from "react-redux";
import { getConversations } from "../../redux/actions/conversations";

const Message = ({ messages, getConversations }) => {
    useEffect(() => {
        getConversations();
    });
    return (
        <React.Fragment>
            <NavigationBar />
            <div className='camp-main-content'>
                <p>Getting users conversation</p>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getConversations: () => {
            return dispatch(getConversations());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
