import Meteor, {createContainer} from 'react-native-meteor';
import React, {PropTypes} from 'react';
import MessageList from '../routes/messageList';

export default TestContainer = createContainer(ownProps => {
    const messagesHandle = Meteor.subscribe('messages');
    return {
        messagesReady: messagesHandle.ready()
    };
}, MessageList);
