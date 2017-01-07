import React, { Component, PropTypes } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity,ScrollView,
  Alert,
  NativeAppEventEmitter,
  ActivityIndicator,
  ActivityIndicatorIOS,
  ProgressBarAndroid

} from 'react-native';

import Meteor, { connectMeteor, MeteorListView } from 'react-native-meteor';
import Button from '../components/button';
import { Actions } from 'react-native-router-flux';

import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';

import AMapLocation from 'react-native-smart-amap-location';


export default class Topics extends Component {

 state = { initialPosition: 'unknown', lastPosition: 'unknown', };
 watchID: ?number = null;

 componentDidMount() {
   navigator.geolocation.getCurrentPosition(
     (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        this.setState({lastPosition});
      }
    );

//gaode code
    AMapLocation.init(null);
    NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult);

  }
  componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
     AMapLocation.cleanUp();
   }


  constructor(props) {
    super(props);

    this.state = {
      title:'',
      content:'',
    }
  }

   _onPressButton(){
    Actions.newTopic();
  }

  showTopicDetail(id){

  }

  renderRow(topic) {

    return (
      <View style={styles.row}>

        <TouchableOpacity onPress={() => this.showTopicDetail(topic._id)}>
          <Text style={styles.rowText}>{topic.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Meteor.call('removeTopic', topic._id)}>
          <Text style={[styles.deleteText]}>X</Text>
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

      <Button text="publish" onPress={this._onPressButton.bind(this)} />

        </ScrollView>

        <View tabLabel="loc">

            <Text style={styles.title}>Initial position: </Text>
            <Text> {this.state.initialPosition} </Text>

            <Text style={styles.title}>Current position: </Text>
            <Text> {this.state.lastPosition} </Text>

            <Button text="location" onPress={this._onShowLocation.bind(this)} />


        </View>

        <Text tabLabel='Tab #1'>tab1</Text>
        <Text tabLabel='Tab #2'>tab2</Text>

      </ScrollableTabView>
    );
  }

  render(){

        return this.renderTopicList();
  }


//gaode code
_onShowLocation(){
  AMapLocation.getReGeocode();
}

_onLocationResult = (result) => {
        if(result.error) {
            Alert.alert(`错误代码: ${result.error.code}, 错误信息: ${result.error.localizedDescription}`);
        }
        else {
            if(result.formattedAddress) {
                Alert.alert(`格式化地址 = ${result.formattedAddress}`);
            }
            else {
                Alert.alert(`纬度 = ${result.coordinate.latitude}, 经度 = ${result.coordinate.longitude}`);
            }
            var lastPosition = JSON.stringify(result);
            this.setState({lastPosition});
        }

    }

}

Topics.propTypes = {
  topicsReady: PropTypes.bool.isRequired,
  status:PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  title: { fontWeight: '500', },
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
    padding: 16,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  rowText: {
    fontSize: 16,
    color:'#00CC00'

  },
  deleteText: {
    fontSize: 16,
    color:'#AACCAA'

  }
});
