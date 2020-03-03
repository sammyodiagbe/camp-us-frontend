import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "../../styles/navigation/navigation.css";
import {
    HomeOutlined,
    SearchOutlined,
    AccountCircle,
    NotificationsActiveOutlined,
    MessageOutlined
} from "@material-ui/icons";
import { connect } from "react-redux";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        });
    }

    render() {
        const { user } = this.props;
        const { _id } = user ? user : {};
        if (!user) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <div className='camp-navigation-bar'>
                <nav className='camp-mobile-navigation-bar'>
                    <div>
                        <NavLink to='/' exact activeClassName='camp-active-nav'>
                            <HomeOutlined fontSize='default' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/search' exact activeClassName='camp-active-nav'>
                            <SearchOutlined fontSize='default' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/messages' exact activeClassName='camp-active-nav'>
                            <MessageOutlined fontSize='default' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={`/profile/${_id}`} exact activeClassName='camp-active-nav'>
                            <AccountCircle fontSize='default' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notifications' exact activeClassName='camp-active-nav'>
                            <NotificationsActiveOutlined
                                fontSize='default'
                                className='camp-navigation-icon'
                            />
                        </NavLink>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { authentication } = state;

    return {
        user: authentication.user
    };
};

export default connect(mapStateToProps, null)(NavigationBar);
