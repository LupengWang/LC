import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import Button from '../components/button';
import { Actions } from 'react-native-router-flux';

export default class NewTopic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title:'',
      content:''
    }
  }

  handlePublishTopic(){

    console.log('state: ', this.state);
    const { title, content } = this.state;
    console.log(title +' '+content);
    topic={title:title,content:content};

    Meteor.call("insertTopic",topic);
    this.render();
    Actions.getTopics();
  }


  renderPublish(){
    console.log("enter render publish");

    return(
      <View>
      <Text>标题</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="标题"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(title) => this.setState({title})}
      />

      <Text>内容</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder="内容"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(content) => this.setState({content})}
      />

      <Button text="publish" onPress={this.handlePublishTopic.bind(this)} />
      </View>

    );

  }

  render(){
        return this.renderPublish();
  }

}

NewTopic.propTypes = {
  topicsReady: PropTypes.bool.isRequired,
  status:PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC',
    padding: 16
  },
  rowText: {
    fontSize: 16,
    color:'#00CC00'
  }
});
