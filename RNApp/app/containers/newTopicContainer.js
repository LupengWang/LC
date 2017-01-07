import React from 'react';
import Meteor, {createContainer} from 'react-native-meteor';
import NewTopic from '../routes/newTopic';

export default EditItemContainer = createContainer((props) => {
    //Meteor.subscribe('items');
    return {

    }
}, NewTopic);
