import React, { Component } from "react";
import HeaderNav from "../partials/navigation";
import { connect } from "react-redux";
import { getUserNotifications } from "../../redux/actions/notifications";
import { Redirect } from "react-router-dom";

class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // get user notifications
        this.props.getUserNotifications();
    }

    render() {
        const { authuser } = this.props;
        if (!authuser) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <HeaderNav />
                <div className='camp-main-content'>user notifications</div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authuser: state.authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserNotifications: () => {
            return dispatch(getUserNotifications());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
