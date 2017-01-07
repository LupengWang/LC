import Meteor from 'react-native-meteor';

export default function() {
    const url = 'ws://192.168.133.126:3000/websocket';
    Meteor.connect(url);
}
