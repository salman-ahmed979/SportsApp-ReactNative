import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const TennisTournament = ({route, navigation}) => {
  const [tournamentsMatch, setTournamentsMatch] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const {tournamentId, title} = route.params;

    navigation.setOptions({headerTitle: `${title}`});

    const url = `https://tennis-live-data.p.rapidapi.com/matches/${tournamentId}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5335c0bdf9mshef90f43433c080cp168a10jsnfd994da69e29',
        'X-RapidAPI-Host': 'tennis-live-data.p.rapidapi.com',
      },
    };
    fetch(url, options)
      .then(response => response.json())
      .then(_result => {
        setTournamentsMatch([_result]);
        console.log(tournamentsMatch);
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setLoading(false));
  }, []);
  const render = itemObject => {
    const {index, item} = itemObject;
    const matchTitle = item?.title;
    return (
      <TouchableOpacity>
        <View
          style={{
            padding: 15,
            marginVertical: 20,
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 30,
            flex: 1,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              fontStyle: 'italic',
              backgroundColor: 'navy',
              color: '#ffff',
            }}>
            {matchTitle}
          </Text>

          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 25,
              marginBottom: 10,
            }}>
            Round: {item?.round_name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Court {item?.court}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Date: {item.date}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              marginTop: 10,
              marginBottom: 10,
            }}>
            Status: {item.status}
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
            Tournaments Matches
          </Text>
          <FlatList
            data={tournamentsMatch[0]?.results?.matches}
            renderItem={render}
          />
        </View>
      )}
    </View>
  );
};
export default TennisTournament;
