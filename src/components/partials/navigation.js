import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navigation/navigation.css";

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
                        <NavLink to='/'>
                            <i>Link1</i>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <i>Link1</i>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <i>Link1</i>
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to='/'>
                            <i>Link1</i>
                        </NavLink>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavigationBar;
