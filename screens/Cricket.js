import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Cricket = ({navigation}) => {
  const [match, setMatches] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://cricket-live-data.p.rapidapi.com/fixtures';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5335c0bdf9mshef90f43433c080cp168a10jsnfd994da69e29',
        'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
      },
    };
    fetch(url, options)
      .then(response => response.json())
      .then(_match => {
        setMatches([_match]);
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const render = itemObject => {
    const {index, item} = itemObject;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DisplayCricketMatch', {
            matchId: item.id,
            seriesId: item.series_id,
            matchTitle: item.match_title,
          });
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 8,
            backgroundColor: index % 2 === 0 ? 'lightblue' : 'lightgreen',
            height: 100,
            borderBottomWidth: 2,
            borderTopWidth: 1,
            borderBottomColor: 'black',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.match_title}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}>
            {item.match_subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>
            Match Fixtures
          </Text>

          <FlatList
            data={match[0]?.results}
            keyExtractor={(item, index) => String(index)}
            renderItem={render}
          />
        </View>
      )}
    </View>
  );
};
export default Cricket;
