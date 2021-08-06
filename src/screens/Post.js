import React, {useEffect, useRef, useState} from 'react';
import NewsList from '../components/NewsList';
import Header from '../components/Header';
import {Images} from '../config/images';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {
  Animated,
  Platform,
  I18nManager,
  RefreshControl,
  View,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {getArticles} from '../config/news';

const Post = props => {
  const {navigation, route} = props;
  const {category} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
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
      getArticles(category).then(data => {
        setList(data);
        console.log(data);
        setLoading(false);
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getArticles(category).then(data => {
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
          data={list}
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
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
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

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
      <Header
        title={category.charAt(0).toUpperCase() + category.slice(1)}
        renderLeft={() => {
          return (
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.icon,
                {
                  transform: [
                    {
                      scaleX: I18nManager.isRTL ? -1 : 1,
                    },
                  ],
                },
              ]}
              source={Images.angleLeft}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      {loading ? renderPlaceholder() : renderList()}
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
