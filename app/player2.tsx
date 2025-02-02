import { Pressable, ScrollView, StyleSheet, Text, TextInput, View  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { getGoal } from './playergoal';

const Player2 = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { p2Name, p2Skill, p1Skill, p2Goal, p2Score, p2Def, p2Timeout } = params;
  const [P2Name, setP2Name] = useState(p2Name);
  const [P2Skill, setP2Skill] = useState(p2Skill);
  const [P1Skill, setP1Skill] = useState(p1Skill);
  const [P2Goal, setP2Goal] = useState(p2Goal);
  const [P2Score, setP2Score] = useState(p2Score);
  const [P2Def, setP2Def] = useState(p2Def);
  const [P2Timeout, setP2Timeout] = useState(p2Timeout);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        let errors = {};
        if (!/^[2-7]$/.test(P2Skill)) errors.skill = '2-7';
        if (!/^[2-7]$/.test(P2Goal)) errors.goal = '2-7';
        if (!/^[0-7]$/.test(P2Score)) errors.score = '0-7';
        if (!/^(?:[0-9]|[1-9][0-9])$/.test(P2Def)) errors.def = '0-99';
        if (!/^[0-9]$/.test(P2Timeout)) errors.timeout = '0-9';
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

  const handleUpdate = () => {
      if (isFormValid) {
          router.dismissTo({
              pathname: '/',
              params: {
                  P2Name: P2Name,
                  P2Skill: P2Skill,
                  P2Goal: P2Goal,
                  P2Score: P2Score,
                  P2Def: P2Def,
                  P2Timeout: P2Timeout,
              },
          });
      }
  };

  useEffect(() => {
      validateForm();
    }, [ P2Goal, P2Score, P2Def, P2Timeout]);

  useEffect(() => {
      if (P2Skill) {
          validateForm();
          setP2Goal(getGoal(P2Skill, P1Skill));
          if (parseInt(P2Score) === 0 ) {
            (parseInt(P2Skill) < 4) ? setP2Timeout('2') : setP2Timeout('1');
          }
          }
    }, [P2Skill]);


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
                      value={P2Name}
                      onChangeText={setP2Name}
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
                          value={P2Skill}
                          onChangeText={setP2Skill}
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
                        <Text style={[styles.textInput, styles.text]}>{P2Goal}</Text>
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
                          value={P2Score}
                          onChangeText={setP2Score}
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
                          value={P2Def}
                          onChangeText={setP2Def}
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
                            value={P2Timeout}
                            onChangeText={setP2Timeout}
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


export default Player2;