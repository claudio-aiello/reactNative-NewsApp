import React from 'react';
import {View, SafeAreaView, ScrollView, Text, StyleSheet} from 'react-native';
import Header from '../components/Header';

export default function Setting() {
  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
      <View style={{padding: 20}}>
        <Header
          style={{marginBottom: 20}}
          renderLeft={() => (
            <Text style={{fontSize: 34, fontWeight: 'bold'}}>Settings</Text>
          )}
          title={''}
          styleLeft={{
            flex: 1,
          }}
          styleContentLeft={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 0,
            width: '100%',
          }}
          styleContentCenter={{
            flex: 0,
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          styleRight={{flex: 0}}
          renderRight={() => {
            return <View></View>;
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.contain}>
        <View style={styles.profileItem}>
          <Text style={styles.textElement}>{'App name'}</Text>
          <Text style={styles.textElement2}>{'News App'}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.textElement}>{'App version'}</Text>
          <Text style={styles.textElement2}>{'1.0.0'}</Text>
        </View>
        <View style={styles.profileItem}>
          <Text style={styles.textElement}>{'Data provided by'}</Text>
          <Text style={styles.textElement2}>{'newsapi.org'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contain: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  textElement: {
    fontSize: 17,
    fontWeight: '400',
  },
  textElement2: {
    fontSize: 17,
    fontWeight: '400',
    color: '#9B9B9B',
  },
});
