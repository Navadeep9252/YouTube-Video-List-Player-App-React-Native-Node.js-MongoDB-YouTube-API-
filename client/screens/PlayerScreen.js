import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function PlayerScreen({ route }) {
  const { video } = route.params;
  const [playing, setPlaying] = useState(true);

  const onChangeState = useCallback((state) => {
    if (state === 'ended') setPlaying(false);
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.player}>
        <YoutubePlayer
          height={230}
          play={playing}
          videoId={video.id}
          onChangeState={onChangeState}
        />
      </View>
      <View style={{padding:12}}>
        <Text style={{fontWeight:'700'}}>{video.title}</Text>
        <Text style={{color:'#666'}}>{video.channelTitle} • {video.duration}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  player: { backgroundColor:'#000' }
});
