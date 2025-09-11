import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ListScreen({ navigation }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        
        const res = await axios.get('http://10.224.85.98:5000/api/videos');

        setVideos(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to load videos: ' + (err.message||''));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" />;

  return (
    <FlatList
      data={videos}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('Player', { video: item })}>
          <View style={styles.row}>
            <Image source={{ uri: item.thumbnails?.medium?.url || item.thumbnails?.default?.url }} style={styles.thumb} />
            <View style={{flex:1}}>
              <Text numberOfLines={2} style={styles.title}>{item.title || 'Untitled'}</Text>
              <Text style={styles.meta}>{item.channelTitle} • {item.duration}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {flexDirection:'row', padding:10, borderBottomWidth:1, borderColor:'#eee'},
  thumb: {width:160, height:90},
  title: {fontWeight:'600'},
  meta: {color:'#666', marginTop:6}
});
