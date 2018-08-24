import React, {Component} from 'react';
import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {USER_CONNECTED, LOGOUT} from '../Events';

const socketUrl = 'http://192.168.2.9:3231';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            user: null,
        }
    }

    componentWillMount() {
        this.initSocket();
    }


    initSocket = () => {
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log('Socket Connected');
            socket.emit('SOCKET_CONNECTED', 'himanshu');

        });

        this.setState({socket});


    };

    /*Sets the user property in state*/
    /*@param user { id:number, name:string }*/

    setUser = (user) => {
        const {socket} = this.state;
        socket.emit(USER_CONNECTED, user);
        this.setState({user});
    };

    logout = () => {
        const {socket} = this.state;
        socket.emit(LOGOUT);
        this.setState({user: null});
    };


    render() {
        const {title} = this.props;
        const {socket, user} = this.state;
        return (
            <div className="container">

                {
                    !user ?
                        <LoginForm socket={this.state.socket} setUser={this.setUser}/>
                        :
                        <ChatContainer socket={socket} user={user} logout={this.logout}/>
                }


            </div>
        );
    }
}

Layout.propTypes = {};

export default Layout;