import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Animated,
  StyleSheet,
  RefreshControl,
  Text,
} from 'react-native';
import NewsList from '../components/NewsList';
import Header from '../components/Header';
import ContentLoader, {Rect} from 'react-content-loader/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Bookmark = ({navigation}) => {
  const [bookmarkpost, setbookmarkpost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;
  const clampedScroll = useRef(
    Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnim,
      ),
      0,
      40,
    ),
  ).current;

  useEffect(() => {
    console.log(loading);
      fetchBookMark().then(data => {
        setList(data);
        console.log(data);
        setLoading(false);
      });
  }, [isFocused]);

  const fetchBookMark = async () => {
    await AsyncStorage.getItem('bookmark').then(async token => {
      res = JSON.parse(token);
      console.log(res);
      setLoading(true);
      if (res) {
        console.log('arr', res);
        const result = res.map(post_id => {
          return post_id;
        });
        console.log(result);

        setbookmarkpost(result);
        console.log(result);
        setLoading(false);
      } else {
        setbookmarkpost([]);
        setLoading(false);
      }
    });
  };

  const onRefresh = () => {
    setRefreshing(true)
    fetchBookMark().then(data => {
      setList(data);
    });
    setRefreshing(false)

  }

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
  };

  const renderItem = ({item, index}) => {
    return (
      <NewsList
        style={{marginVertical: 8}}
        description={item.description}
        title={item.title}
        subtitle={item.subtitle}
        date={item.publishedAt}
        image={{uri: item.urlToImage}}
        onPress={goPostDetail(item)}
      />
    );
  };

  const renderList = () => {
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    const android = Platform.OS == 'android';
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          contentInset={{top: 50}}
          contentContainerStyle={{
            marginTop: android ? 50 : 0,
            paddingHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={['#E5634D']}
              tintColor={'#E5634D'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollAnim,
                  },
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={bookmarkpost}
          key={1}
          numColumns={1}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
        <Animated.View
          style={[
            styles.navbar,
            {transform: [{translateY: navbarTranslate}]},
          ]}></Animated.View>
      </View>
    );
  };

  const renderPlaceholder = () => {
    return (
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']} >
        <View style={{padding: 20}}>
          <ContentLoader
            speed={0.5}
            width={'100%'}
            height={'100%'}
            backgroundColor="#f3f3f3"
            foregroundColor={'#BDBDBD'}>
            <Rect x="0" y="0" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="90" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="225" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="360" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="495" rx="8" ry="8" width="100%" height={120} />
            <Rect x="0" y="630" rx="8" ry="8" width="100%" height={120} />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };

  if (loading) {
    return renderPlaceholder();
  } else if (bookmarkpost.length == 0) {
    return (
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        <View style={{padding: 20}}>
          <Header
            style={{marginBottom: 20}}
            renderLeft={() => (
              <Text style={{fontSize: 34, fontWeight: 'bold'}}>Bookmark</Text>
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
        <View
          style={{
            textAlign: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Image source={require('../assets/images/nobookmark.jpg')} />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        <View style={{padding: 20}}>
          <Header
            style={{marginBottom: 20}}
            renderLeft={() => (
              <Text style={{fontSize: 34, fontWeight: 'bold'}}>Bookmark</Text>
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
        {renderList()}
      </SafeAreaView>
    );
  }
};
export default Bookmark;

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});
