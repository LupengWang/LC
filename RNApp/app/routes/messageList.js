import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import Button from '../components/button';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

export default class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title:'',
      content:'',
    }
  }

   onPressButton(){
    Actions.newTopic();
  }

  renderRow(topic) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => this.showTopicDetail(topic._id)}>
          <Text style={styles.rowText}>{topic.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Meteor.call('removeTopic', topic._id)}>
          <Text style={[styles.rowText, styles.deleteText]}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderTopicList(){
    const { topicsReady } = this.props;
    if (!topicsReady) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return(
      <ScrollableTabView    style={{marginTop: 20, }}
        renderTabBar={() => <DefaultTabBar />}>

        <ScrollView tabLabel="信息" style={styles.tabView}>
          <MeteorListView
            collection="topics"
            style={styles.container}
            // selector={{}}
            options={{sort: {createdAt: -1}}}
            renderRow={this.renderRow}
        />

      <Button text="publish" onPress={this.onPressButton.bind(this)} />

        </ScrollView>

        <Text tabLabel='Tab #1'>tab1</Text>
        <Text tabLabel='Tab #2'>tab2</Text>

      </ScrollableTabView>
    );
  }

  render(){

        return this.renderTopicList();
  }

}

Topics.propTypes = {
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
