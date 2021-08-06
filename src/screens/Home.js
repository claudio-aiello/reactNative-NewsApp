import CardSlide from '../components/CardSlide';
import News43 from '../components/News43';
import NewsList from '../components/NewsList';
import React, {useEffect, useState} from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {
  FlatList,
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  RefreshControl,
} from 'react-native';
import {getArticles} from '../config/news';

const Home = props => {
  const {navigation} = props;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState(null);
  const category = 'general';

  useEffect(() => {
      getArticles(category).then(data => {
        setArticles(data);
        setLoading(false);
      });
  }, []);

  const onRefresh = () => {
    setRefreshing(true)
    getArticles(category).then(data => {
      setArticles(data);
    });
    setRefreshing(false)

  }

  const goPostDetail = item => () => {
    navigation.navigate('PostDetail', {item: item});
  };

  const renderPlaceholder = () => {
    return (
      <View style={styles.paddingSrollView}>
        <ContentLoader
          speed={0.5}
          width={'100%'}
          height={'100%'}
          backgroundColor="#f3f3f3"
          foregroundColor={'#BDBDBD'}>
          <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
          <Rect x="0" y="40" rx="8" ry="8" width="80%" height="20" />
          <Rect x="0" y="80" rx="8" ry="8" width="100%" height={250} />

          <Rect x="0" y={350} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={360} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={380} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={410} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={440} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={450} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={470} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={495} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={530} rx="8" ry="8" width="110" height={80} />
          <Rect x="120" y={540} rx="8" ry="8" width="30%" height={10} />
          <Rect x="120" y={560} rx="8" ry="8" width="60%" height={15} />
          <Rect x="120" y={585} rx="8" ry="8" width="40%" height={10} />

          <Rect x="0" y={630} rx="8" ry="8" width="50%" height={160} />
          <Rect x="53%" y={630} rx="8" ry="8" width="50%" height={160} />
        </ContentLoader>
      </View>
    );
  };

  const renderContent = () => {
    const mainNews = articles[0];
    const imagemainNews = {uri: mainNews.urlToImage};

    const news = articles.slice(1, 4);
    const popularNews = articles.slice(4, 9);

    console.log(mainNews);
    return (
      <ScrollView contentContainerStyle={styles.paddingSrollView}           refreshControl={
        <RefreshControl
          colors={['#E5634D']}
          tintColor={'#E5634D'}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <Text style={styles.headerText}>{'News'}</Text>
        <Text style={styles.subheaderText}>{'Read latest news'}</Text>
        <News43
          onPress={goPostDetail(mainNews)}
          style={{marginTop: 15}}
          image={imagemainNews}
          name={mainNews.name}
          description={mainNews.description}
          title={mainNews.title}
        />
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.paddingFlatList}
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <NewsList
              image={{uri: item.urlToImage}}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              style={{
                marginBottom: index == 15,
              }}
              onPress={goPostDetail(item)}
            />
          )}
        />
        <FlatList
          contentContainerStyle={styles.paddingFlatList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularNews}
          keyExtractor={(item, index) => item.id}
          renderItem={({item, index}) => (
            <CardSlide
              onPress={goPostDetail(item)}
              style={{
                marginRight: index == 15,
              }}
              image={{uri: item.urlToImage}}
              date={item.date}
              title={item.title}
            />
          )}
        />
      </ScrollView>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        {loading ? renderPlaceholder() : renderContent()}
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  subheaderText: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: '400',
    color: '#9B9B9B',
  },
  paddingSrollView: {padding: 20},
  paddingFlatList: {
    paddingTop: 24,
  },
});
