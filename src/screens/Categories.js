import React, {useEffect, useState} from 'react';
import CategoryList from '../components/List';
import Header from '../components/Header';
import {CategoryData} from '../data/category';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {FlatList, RefreshControl, View, SafeAreaView, Text} from 'react-native';

const Categories = props => {
  const {navigation} = props;
  const [category, setCategory] = useState(CategoryData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, Math.floor(Math.random() * 1000) + 1000);
  }, []);

  const goToPost = category => {
    navigation.navigate('Post', {category: category});
  };

  const renderItem = ({item, index}) => {
    return (
      <CategoryList
        style={{
          paddingBottom: 15,
        }}
        title={item.title}
        color={item.color}
        image={item.image}
        onPress={() => goToPost(item.category)}
      />
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
            <Rect x="0" y="0" rx="8" ry="8" width="40%" height="30" />
            <Rect x="0" y="40" rx="8" ry="8" width="100%" height="30" />
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

  const renderContent = () => {
    return (
      <SafeAreaView style={{flex: 1}} edges={['right', 'top', 'left']}>
        <View style={{padding: 20}}>
          <Header
            style={{marginBottom: 20}}
            renderLeft={() => (
              <Text style={{fontSize: 34, fontWeight: 'bold'}}>Categories</Text>
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
          />
        </View>

        <FlatList
          key={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          numColumns={1}
          data={category}
          keyExtractor={(item, index) => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    );
  };

  return loading ? renderPlaceholder() : renderContent();
};

export default Categories;
