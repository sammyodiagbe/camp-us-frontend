import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navigation/navigation.css";
import {
    HomeOutlined,
    SearchOutlined,
    AccountCircle,
    SettingsOutlined,
    NotificationsActiveOutlined
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
        const { user } = this.state;
        const { _id } = user ? user : {};
        return (
            <div className='camp-navigation-bar'>
                <nav className='camp-mobile-navigation-bar'>
                    <div>
                        <NavLink to='/' exact activeClassName='camp-active-nav'>
                            <HomeOutlined fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/search' exact activeClassName='camp-active-nav'>
                            <SearchOutlined fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to={`/profile/${_id}`} exact activeClassName='camp-active-nav'>
                            <AccountCircle fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/notifications' exact activeClassName='camp-active-nav'>
                            <NotificationsActiveOutlined
                                fontSize='large'
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
