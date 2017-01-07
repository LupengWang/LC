import Meteor, {createContainer} from 'react-native-meteor';
import React, {PropTypes} from 'react';
import Topics from '../routes/topics';

export default TestContainer = createContainer(ownProps => {
    const topicsHandle = Meteor.subscribe('topics');
    return {
        topicsReady: topicsHandle.ready()
    };
}, Topics);
