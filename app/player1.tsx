import { Pressable, ScrollView, StyleSheet, Text, TextInput, View  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getGoal } from './playergoal';

const Player1 = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { p1Name, p1Skill, p2Skill, p1Goal, p1Score, p1Def, p1Timeout } = params;
  const [P1Name, setP1Name] = useState(p1Name);
  const [P1Skill, setP1Skill] = useState(p1Skill);
  const [P2Skill, setP2Skill] = useState(p2Skill);
  const [P1Goal, setP1Goal] = useState(p1Goal);
  const [P1Score, setP1Score] = useState(p1Score);
  const [P1Def, setP1Def] = useState(p1Def);
  const [P1Timeout, setP1Timeout] = useState(p1Timeout);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        let errors = {};
        if (!/^[2-7]$/.test(P1Skill)) errors.skill = '2-7';
        if (!/^[2-7]$/.test(P1Goal)) errors.goal = '2-7';
        if (!/^[0-7]$/.test(P1Score)) errors.score = '0-7';
        if (!/^(?:[0-9]|[1-9][0-9])$/.test(P1Def)) errors.def = '0-99';
        if (!/^[0-9]$/.test(P1Timeout)) errors.timeout = '0-9';
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

  const handleUpdate = () => {
      if (isFormValid) {
          router.dismissTo({
              pathname: '/',
              params: {
                  P1Name: P1Name,
                  P1Skill: P1Skill,
                  P1Goal: P1Goal,
                  P1Score: P1Score,
                  P1Def: P1Def,
                  P1Timeout: P1Timeout,
              },
          });
      }
  };

  useEffect(() => {
      validateForm();
    }, [ P1Goal, P1Score, P1Def, P1Timeout]);

  useEffect(() => {
      if (P1Skill) {
          validateForm();
          setP1Goal(getGoal(P1Skill, P2Skill));
          if (parseInt(P1Score) === 0 ) {
            (parseInt(P1Skill) < 4) ? setP1Timeout('2') : setP1Timeout('1');
          }
          }
    }, [P1Skill]);


return (
<View style={styles.main}>
    <View style={styles.player}>
        <ScrollView
        style={styles.scrollview}
        >
            <View style={styles.row}>
                <View style={styles.row}>
                    <Text style={[styles.textInput, styles.text]}>Name:</Text>
                </View>
                <View style={styles.row}>
                    <TextInput
                      style={styles.textInput}
                      disableFullscreenUI={true}
                      placeholder="Player Name"
                      value={P1Name}
                      onChangeText={setP1Name}
                    />
                </View>
                <View style={styles.row}></View>
            </View>

            <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>Skill:</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                          style={styles.textInput}
                          disableFullscreenUI={true}
                          keyboardType="numeric"
                          placeholder="Skill"
                          value={P1Skill}
                          onChangeText={setP1Skill}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.error}>{errors.skill}</Text>
                    </View>
            </View>
            <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>Goal:</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>{P1Goal}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.error}>{errors.goal}</Text>
                    </View>
            </View>

            <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>Score:</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                          style={styles.textInput}
                          disableFullscreenUI={true}
                          keyboardType="numeric"
                          placeholder="Score"
                          value={P1Score}
                          onChangeText={setP1Score}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.error}>{errors.score}</Text>
                    </View>
            </View>

            <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>Defense:</Text>
                    </View>
                    <View style={styles.row}>
                        <TextInput
                          style={styles.textInput}
                          disableFullscreenUI={true}
                          keyboardType="numeric"
                          placeholder="Defense"
                          value={P1Def}
                          onChangeText={setP1Def}
                        />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.error}>{errors.def}</Text>
                    </View>
            </View>

            <View style={styles.row}>
                    <View style={styles.row}>
                        <Text style={[styles.textInput, styles.text]}>Timeouts:</Text>
                    </View>
                    <View style={styles.row}>
                          <TextInput
                            style={styles.textInput}
                            disableFullscreenUI={true}
                            keyboardType="numeric"
                            placeholder="Timeouts"
                            value={P1Timeout}
                            onChangeText={setP1Timeout}
                          />
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.error}>{errors.timeout}</Text>
                    </View>
            </View>

            <View style={styles.row}>
                <Pressable style={styles.apply} onPress={handleUpdate}>
                    <Text style={[styles.textInput, styles.text]}>Apply</Text>
                </Pressable>
            <View style={styles.row}></View>
            </View>
        </ScrollView>
    </View>
</View>

  );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#003594BF',
        //justifyContent: 'center',
        },
    player: {
        flex: 5,
        backgroundColor: '#003594BF',
        },
    scrollview: {
        flex: 1
        },
    row: {
        flex: 1,
        flexDirection: 'row',
        },
    text: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 5,
        },
    textInput: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'lightblue',
        alignContent: 'center',
        margin: 2,
        borderRadius: 10,
        fontSize: 18,
        height: 40,
        },
    error: {
        flex: 1,
        fontWeight: 500,
        fontSize: 24,
      },
    apply: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
});


export default Player1;