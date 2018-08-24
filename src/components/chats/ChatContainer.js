import React, {Component} from 'react';
import Sidebar from './Sidebar';

class ChatContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chats: [],
            activeChat: null
        };
    }

    setActiveChat = (activeChat) => {
        this.setState({activeChat});
    };

    render() {
        const {user, logout} = this.props;
        const {chats, activeChat} = this.state;
        return (
            <div className="container">
                <Sidebar
                    logout={logout}
                    chats={chats}
                    user={user}
                    activeChat={activeChat}
                    setActiveChat={this.setActiveChat}
                />
                <div className="chat-room-container">
                    {
                        activeChat !== null ? (
                            <div className="chat-room">
                                <ChatHeading name={activeChat.name}/>
                                <Messages messages={activeChat.messages} user={user}/>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        );
    }
}

export default ChatContainer;