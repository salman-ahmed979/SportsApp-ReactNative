import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CricketMatch = ({route, navigation}) => {
  const [matchResult, setMatchResult] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const {matchId, seriesId, matchTitle} = route.params;

    navigation.setOptions({headerTitle: `Match Result: ${matchTitle}`});

    const url = `https://cricket-live-data.p.rapidapi.com/match/${matchId}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5335c0bdf9mshef90f43433c080cp168a10jsnfd994da69e29',
        'X-RapidAPI-Host': 'cricket-live-data.p.rapidapi.com',
      },
    };
    fetch(url, options)
      .then(response => response.json())
      .then(_result => {
        setMatchResult([_result]);
      })
      .catch(err => Alert.alert('Error', err))
      .finally(() => setLoading(false));
  }, []);
  const render = itemObject => {
    const {index, item} = itemObject;
    const summary = item?.results?.live_details?.match_summary;
    const matchTitle = item.results.fixture.match_title;
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
          {summary == null ? (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 25,
                marginBottom: 10,
              }}>
              Match will begin soon
            </Text>
          ) : (
            <>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 25,
                  marginBottom: 10,
                }}>
                Toss: {summary?.toss}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                In Play: {summary?.in_play}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                Away Scores:{' '}
                {summary?.away_scores === '' ? 'None' : summary?.away_scores}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                Home Scores:{' '}
                {summary?.home_scores === '' ? 'None' : summary?.home_scores}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                Result: {summary?.result}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                Status: {summary?.status}
              </Text>
            </>
          )}
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
            Score Result
          </Text>
          <FlatList data={matchResult} renderItem={render} />
        </View>
      )}
    </View>
  );
};
export default CricketMatch;
