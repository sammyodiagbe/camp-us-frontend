import React, { Component } from "react";
import { connect } from "react-redux";
import { logUserIn } from "../../redux/actions/auth-actions";
import "../../styles/authentication/auth.css";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: {
                username: "",
                password: ""
            }
        };
    }

    handleInputChange = (e) => {
        const { id, value } = e.target;
        const input = { ...this.state.input, [id]: value };
        this.setState({
            input
        });
    };

    login = (e) => {
        e.preventDefault();
        const { input: data } = this.state;
        this.props.login(data);
    };

    // static getDerivedStateFromProps = (props) => {
    //     console.log(props);
    //     const { user } = props;
    //     if (user) {
    //         this.props.history.push("/");
    //     }
    //     return {};
    // };
    render() {
        const { input } = this.state;
        const { username, password } = input;
        const { user } = this.props;
        if (user) {
            return <Redirect to='/' />;
        }
        return (
            <div className='camp-auth-container'>
                <h1 className='camp-auth-title'>Login</h1>
                <form onSubmit={this.login} noValidate>
                    <div>
                        <label htmlFor='username'>
                            <input
                                type='text'
                                placeholder='username or email'
                                id='username'
                                value={username}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='password'>
                            <input
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <p>
                    Don't have an account <Link to='/auth/signup'>Create Account</Link>
                </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            return dispatch(logUserIn(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
