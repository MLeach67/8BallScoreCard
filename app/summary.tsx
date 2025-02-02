import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

const Summary = ({navigation, route}) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
      p1Name,
      p1Skill,
      p1Goal,
      p1Score,
      p1Def,
      p2Name,
      p2Skill,
      p2Goal,
      p2Score,
      p2Def,
      innings,
      split,
      p1BandR,
      p1Snap,
      p1Scratch,
      p1WrongPocket,
      p1Early,
      p2BandR,
      p2Snap,
      p2Scratch,
      p2WrongPocket,
      p2Early
  } = params;

  let isBandR = false;
  let isSnap = false;
  let isScratch = false;
  let isWrongPocket = false;
  let isEarly = false;

  if (p1BandR > 0 || p2BandR > 0) isBandR = true;
  if (p1Snap > 0 || p2Snap > 0) isSnap = true;
  if (p1Scratch > 0 || p2Scratch > 0) isScratch = true;
  if (p1WrongPocket > 0 || p2WrongPocket > 0) isWrongPocket = true;
  if (p1Early > 0 || p2Early > 0) isEarly = true;

  const navToIndex = () => {
      router.dismissTo({
        pathname: '/',
        });
  };

  useEffect(() => {
      },[split]);


  return (
  <View style={styles.main}>
       <View style={styles.row}>
          <Text style={styles.text}>Players:</Text>
          <Text style={styles.text}>{p1Name}</Text>
          <Text style={styles.text}>{p2Name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Score:</Text>
          <Text style={styles.text}>{p1Score}</Text>
          <Text style={styles.text}>{p2Score}</Text>
        </View>

       <View style={styles.row}>
          <Text style={styles.text}>Skill:</Text>
          <Text style={styles.text}>{p1Skill}</Text>
          <Text style={styles.text}>{p2Skill}</Text>
        </View>

        <View style={styles.row}>
        <Text style={styles.text}>Goal:</Text>
        <Text style={styles.text}>{p1Goal}</Text>
        <Text style={styles.text}>{p2Goal}</Text>
        </View>

        <View style={styles.row} >
          <Text style={styles.text}>Defense:</Text>
          <Text style={styles.text}>{p1Def}</Text>
          <Text style={styles.text}>{p2Def}</Text>
        </View>

        {isSnap &&
        <View style={styles.row} >
          <Text style={styles.text}>OnTheSnap:</Text>
          <Text style={styles.text}>{p1Snap}</Text>
          <Text style={styles.text}>{p2Snap}</Text>
        </View>
        }
        
        {isBandR &&
        <View style={styles.row} >
          <Text style={styles.text}>BreakAndRun:</Text>
          <Text style={styles.text}>{p1BandR}</Text>
          <Text style={styles.text}>{p2BandR}</Text>
        </View>
        }

        {isScratch &&
        <View style={styles.row} >
          <Text style={styles.text}>Scratch8:</Text>
          <Text style={styles.text}>{p1Scratch}</Text>
          <Text style={styles.text}>{p2Scratch}</Text>
        </View>
        }

        {isEarly &&
        <View style={styles.row} >
          <Text style={styles.text}>Early8:</Text>
          <Text style={styles.text}>{p1Early}</Text>
          <Text style={styles.text}>{p2Early}</Text>
        </View>
        }

        {isWrongPocket &&
        <View style={styles.row} >
          <Text style={styles.text}>WrongPocket:</Text>
          <Text style={styles.text}>{p1WrongPocket}</Text>
          <Text style={styles.text}>{p2WrongPocket}</Text>
        </View>
        }

        <View style={styles.row} >
          <Text style={styles.text}>Split {split}</Text>
          <Text style={styles.text}>Innings: {innings}</Text>
        </View>
        <View style={styles.row}>
        <Pressable
        onPress={navToIndex}
        style={styles.row}
        >
            <Text style={styles.text}>Back</Text>
        </Pressable>
        <View style={styles.row}></View>
        </View>
  </View>
  );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#003594BF',
        },
    row: {
        flex: 1,
        flexDirection: 'row',
        },
    back: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        //margin: 1,
        //padding: 5,
        //alignItems: 'center',
        },
    text: {
        flex: 1,
        //fontSize: 32,
        backgroundColor: 'skyblue',
        margin: 2,
        padding: 5,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
        }
    });

export default Summary;