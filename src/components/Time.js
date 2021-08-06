import React, {Component} from 'react';
import {Text} from 'react-native';
import moment from 'moment';

class Time extends Component {
  constructor(props) {
    super(props);
    this.date = props.time;
  }

  render() {
    const time = moment(this.date || moment.now()).fromNow();
    return (
      <Text
        note
        style={{
          marginHorizontal: 10,
          fontSize: 13,
          color: '#9B9B9B',
          marginLeft: 5,
        }}>
        {time}
      </Text>
    );
  }
}

export default Time;
