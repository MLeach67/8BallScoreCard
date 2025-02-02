import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View} from 'react-native';

const Help = () => {
    const router = useRouter();

    const navToIndex = () => {
        router.dismissTo({
          pathname: '/',
          });
    };
  return (
    <View style={styles.main}>
    <Text style={styles.text}>This App is intended for 8 ball practice using the APA scoring system.</Text>
    <Text style={styles.text}>Light blue fields can be pressed to be updated at any time.</Text>
    <Text style={styles.text}>Press PlayerName to change Name, Skill level, Score, Safeties, and Timeouts.</Text>
    <Text style={styles.text}>Press Players score box to switch shooters and add innings.</Text>
    <Text style={styles.text}>Press ball buttons to score the round.</Text>
    <Text style={styles.text}>When a player reaches their goal a summary page is displayed.</Text>
    <Text></Text>
    <Pressable onPress={navToIndex}>
            <Text style={styles.text}>Go Play!</Text>
    </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#003594BF',
        justifyContent: 'center',
        },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        },
    text: {
        //flex:1,
        fontSize: 18,
        backgroundColor: 'skyblue',
        //borderRadius: 10,
        fontSize: 24,
        textAlign: 'center',
        }
    });

export default Help;