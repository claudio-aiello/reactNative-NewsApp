import Header from '../components/Header';
import Button from '../components/Button'
import Tag from '../components/Tag';
import TimeAgo from '../components/Time';
import {Images} from '../config/images';
import * as Utils from '../utils';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import FastImage from 'react-native-fast-image';



const PostDetail = props => {
  const {navigation, route} = props;
  const {item} = route.params;
  const [loading, setLoading] = useState(true);
  const [bookmark, setbookmark] = useState(false);
  const [modal, setModal] = useState(false)
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const scrollY = useRef(new Animated.Value(0)).current;
  const { url, urlToImage, author, publishedAt, title,  content} = item;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      renderBookMark(item)
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const saveBookMark = async post_id => {
    setbookmark(true);
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res !== null) {
        function isTitle(el) {
          return item.title === el.title;
        }
        let data = res.find(isTitle);
        console.log(data)
        if (data == null) {
          res.push(item);
          AsyncStorage.setItem('bookmark', JSON.stringify(res));
          alert('Article saved');
          console.log(res)
        }
      } else {
        let bookmark = [];
        bookmark.push(item);
        AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
        alert('Article saved 2');
      }
    });
  };

  const removeBookMark = async post_id => {
    setbookmark(false);
    const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      const res2 = [];
      function isTitle(el) {
        return item.title === el.title;
      }
      for (let i = 0; i < res.length; i++) {
        if (res[i] !== res.find(isTitle)) {
          res2.push(res[i]);
        }
      }
      console.log(res2)

      return res2;
    });
    await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
    alert('Article removed');
  };

  const renderBookMark = async post_id => {
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        function isTitle(el) {
          return item.title === el.title;
        }
        let data = res.find(isTitle);
        return data == null ? setbookmark(false) : setbookmark(true);
      }
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleModalClose = () => {
    setModal(false)
  }

  const handleModalOpen = () => {
    setModal(true)
  }

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: ['white', '#E5634D'],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const renderPlaceholder = () => {
    let holders = Array.from(Array(7));
    let y = 0;
    let height = 10;

    return (
      <View style={{height: 120}}>
        <ContentLoader
          speed={0.5}
          width={'100%'}
          height={'100%'}
          backgroundColor="#f3f3f3"
          foregroundColor={'#BDBDBD'}>
          {holders.map((item, index) => {
            y = index % 9 == 7 ? y + 30 : y + 15;
            return (
              <Rect
                key={index}
                x="20"
                y={y}
                rx="8"
                ry="8"
                width={index % 9 == 6 ? '50%' : '90%'}
                height={10}
              />
            );
          })}
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <Fragment>
        <View style={styles.contentDescription}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}
            numberOfLines={100}>
            {content}
          </Text>
        </View>

        <Button
          full
          style={{ marginTop: 20, marginBottom: 20, width: "50%", alignSelf: "center" }}
          onPress={handleModalOpen}
        >
          {"Read more"}
        </Button>
        <Modal animationType="slide"
        transparent={false}
        visible={modal}>
          <SafeAreaView style={{flex: 1,backgroundColor: '#E5634D'}} edges={['right', 'top', 'left']}>
          <Header
            title={title}
            style={{  }}
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon2,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon2,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={handleModalClose}
            onPressRight={onShare}
          />
          <WebView source={{uri: url}} style={{flex: 1}}
           onError={handleModalClose} startInLoadingState
           scalesPageToFit />
           </SafeAreaView>
    </Modal>
      </Fragment>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{flex: 1}}
        forceInset={{top: 'always', bottom: 'always'}}>
        <Header title={title} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(Utils.heightHeader());
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{zIndex: 10}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ])}>
          <View style={{height: 230 - heightHeader}} />
          <View
            style={{
              marginBottom: 10,
              paddingHorizontal: 20,
            }}>
            <Text style={{fontSize: 28, fontWeight: '600', marginBottom: 10}}>
              {title}
            </Text>

            <View style={styles.lineSpace}>
              <View>
                <TouchableOpacity
                  style={styles.rateLine}
                  onPress={() => navigation.navigate('Review')}>
                  <Tag
                    rateSmall
                    style={{marginRight: 5}}
                    onPress={() => navigation.navigate('Review')}>
                    {author}
                  </Tag>
                  <TimeAgo time={publishedAt}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {loading ? renderPlaceholder() : renderContent()}
        </ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}>
        <FastImage source={{uri: urlToImage}} style={{flex: 1}} />
        {bookmark ? <TouchableOpacity
          style={[styles.viewIcon, {backgroundColor: "white"}]}
          onPress={() => removeBookMark(item.title)}>
          <MaterialCommunityIcons name="bookmark" size={24} color='#FF8A65' /> 
        </TouchableOpacity> : <TouchableOpacity
          style={[styles.viewIcon, {backgroundColor: '#FF8A65'}]}
          onPress={() => saveBookMark(item.title)}>
          <MaterialCommunityIcons name="bookmark" size={24} color="white" /> 
        </TouchableOpacity>}
        
      </Animated.View>
      <Animated.View style={[styles.headerStyle, {position: 'absolute'}]}>
        <SafeAreaView
          style={{width: '100%'}}
          forceInset={{top: 'always', bottom: 'never'}}>
          <Header
            title=""
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
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={Images.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default PostDetail;

const styles = StyleSheet.create({
  headerStyle: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999
  },
  headerImageStyle: {
    height: 250,
    width: '100%',
    top: 0,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 998,
    paddingBottom: 20,
  },
  lineSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateLine: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentDescription: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    // paddingBottom: 20
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon2: {
    width: 20,
    height: 20
  },
});
