import React, {Component} from 'react';
import {VERIFY_USER} from '../Events';
import PropTypes from 'prop-types';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: "",
            error: ""
        }

    }

    setError = (error) => {
        this.setState({error});
    };

    setUser = ({user, isUser}) => {
        console.log(user, isUser);
        if (isUser) {
            this.setError("Username Taken");
        } else {
            this.props.setUser(user);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {socket} = this.props;
        const {nickname} = this.state;

        socket.emit(VERIFY_USER, nickname, this.setUser);
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };


    render() {
        const {nickname, error} = this.state;
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                    <label htmlFor="nickname">
                        <h1>Got a nickname?</h1>
                    </label>
                    <input
                        ref={(input) => {
                            this.textInput = input;
                        }}
                        id="nickname"
                        value={nickname}
                        onChange={this.handleChange}
                        placeholder={'Username'}
                        name="nickname"
                        type="text"/>
                    <div className="error">{error ? error : null}</div>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {};

export default LoginForm;