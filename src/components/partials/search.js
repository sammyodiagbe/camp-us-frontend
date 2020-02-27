import React from "react";
import { Link } from "react-router-dom";

const Search = ({ searchedusers, authuser }) => {
    const { _id: authuserid } = authuser;
    const renderSearchedUsers = searchedusers.map((user, index) => {
        const { _id, name, nickname } = user;
        return authuserid === _id ? null : (
            <p className='camp-a-search'>
                <Link to={`/profile/${_id}`}>{`${name}`}</Link>
                <p>@{nickname}</p>
            </p>
        );
    });
    return <div className='camp-search-results'>{renderSearchedUsers}</div>;
};

export default Search;
