import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navigation/navigation.css";
import { HomeOutlined, SearchOutlined, AccountCircle, SettingsOutlined } from "@material-ui/icons";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className='camp-navigation-bar'>
                <nav className='camp-mobile-navigation-bar'>
                    <div>
                        <NavLink to='/hello'>
                            <HomeOutlined
                                fontSize='large'
                                className='camp-navigation-icon active'
                            />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <SearchOutlined fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <AccountCircle fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <SettingsOutlined fontSize='large' className='camp-navigation-icon' />
                        </NavLink>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;
