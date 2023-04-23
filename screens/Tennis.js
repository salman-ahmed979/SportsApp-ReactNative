import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Tennis = ({navigation}) => {
  const [tournaments, setTournaments] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://tennis-live-data.p.rapidapi.com/tournaments/ATP/2020';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5335c0bdf9mshef90f43433c080cp168a10jsnfd994da69e29',
        'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
      },
    };

    fetch(url, options)
      .then(response => response.json())
      .then(_tournaments => {
        setTournaments([_tournaments]);
        console.log(tournaments);
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
          navigation.navigate('DisplayTennisTournaments', {
            tournamentId: item.id,
            title: item.name,
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
            {item.name}
          </Text>
          <Text
            style={{
              marginTop: 10,
            }}>
            {item.city}
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
            Tournaments
          </Text>

          <FlatList
            data={tournaments[0]?.results}
            keyExtractor={(item, index) => String(index)}
            renderItem={render}
          />
        </View>
      )}
    </View>
  );
};
export default Tennis;
