import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

const userList = [
  {
    user: 'huy',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
  {
    user: 'huy1',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
  {
    user: 'huy2',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
  {
    user: 'huy3',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
  {
    user: 'huy4',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
  {
    user: 'huy5',
    image:
      'https://www.meme-arsenal.com/memes/53546583e715c39bb17fcc3deebce071.jpg',
  },
];

function StoriesBar(props) {
  return (
    <View style={{marginBottom: 13}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {userList.map((story, index) => (
          <View key={index} style={{alignItems:'center'}}>
            <Image source={{uri: story.image}} style={styles.story}></Image>
            <Text style={{color: 'white', justifyContent: 'center'}}>
              {story.user.lenght > 11
                ? story.user.slice(0, 10).toLowerCase() + '...'
                : story.user}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
});

export default StoriesBar;
