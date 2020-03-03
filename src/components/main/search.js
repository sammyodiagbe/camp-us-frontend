import "../../styles/search/search.css";
import React, { Component } from "react";
import HeaderNav from "../partials/navigation";
import { connect } from "react-redux";
import { findUser } from "../../redux/actions/search";
import Searches from "../partials/search";
import { Redirect } from "react-router-dom";

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchquery: ""
        };
    }

    handleInputChange = (e) => {
        const { value } = e.target;
        this.setState({
            searchquery: value
        });
    };

    findUser = (e) => {
        console.log("finding user");
        e.preventDefault();
        const { searchquery } = this.state;
        console.log(searchquery);
        if (searchquery.trimLeft() === "" || searchquery.trimRight() === "") return;
        this.props.findUser(searchquery);
    };

    render() {
        const { searchquery } = this.state;
        const { searchedusers, authuser } = this.props;
        if (!authuser) {
            return <Redirect to='/auth/login' />;
        }
        return (
            <React.Fragment>
                <HeaderNav />
                <div className='camp-main-content'>
                    <div className='camp-search-container'>
                        <form noValidate onSubmit={this.findUser}>
                            <input
                                type='text'
                                placeholder='search friend'
                                value={searchquery}
                                onChange={this.handleInputChange}
                            />
                        </form>
                    </div>
                    <Searches authuser={authuser} searchedusers={searchedusers} />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateTProps = (state) => {
    const { searches, authentication } = state;
    return {
        searchedusers: searches.searchedusers,
        authuser: authentication.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        findUser: (searchquery) => {
            return dispatch(findUser(searchquery));
        }
    };
};

export default connect(mapStateTProps, mapDispatchToProps)(Search);
