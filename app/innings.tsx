import { Pressable, StyleSheet, Text, TextInput, View  } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

const Innings = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { innings } = params;
  const [Innings, setInnings] = useState(innings);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


    const validateForm = () => {
        let errors = {};
        if (!/^(?:[0-9]|[1-9][0-9])$/.test(Innings)) errors.innings = '0-99';
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

  const handleUpdate = () => {
      if (isFormValid) {
          router.dismissTo({
              pathname: '/',
              params: {
                  Innings: Innings
              },
          });
      }
  };

  useEffect(() => {
      validateForm();
    }, [Innings]);

  return (
<View style={styles.main}>
    <View style={styles.innings}>
            <View style={styles.row}>
                <View style={styles.row}>
                    <Text style={[styles.textInput, styles.text]}>Innings:</Text>
                </View>
                <View style={styles.row}>
                    <TextInput
                      style={styles.textInput}
                      disableFullscreenUI={true}
                      keyboardType="numeric"
                      placeholder="Innings"
                      value={Innings}
                      onChangeText={setInnings}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.error}>{errors.innings}</Text>
                </View>
            </View>
      </View>
            <View style={styles.row}>
                <Pressable style={styles.apply} onPress={handleUpdate}>
                    <Text style={[styles.textInput, styles.text]}>Apply</Text>
                </Pressable>
                 <View style={styles.row}></View>
            </View>
  </View>
  )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#003594BF',
        },
    innings: {
        flex: 5,
        },
    scrollview: {
        flex: 1
        },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'space-around',
        padding: 2
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
        margin: 2,
        borderRadius: 10,
        fontSize: 18,
        height: 40,
        width: 300
        },
    error: {
        flex: 1,
        fontWeight: 500,
        fontSize: 24,
      },
    apply: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-end',
        },
});

export default Innings;