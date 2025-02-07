import { useLocalSearchParams , useRouter} from "expo-router";
import { useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import { useKeepAwake } from 'expo-keep-awake';
import { getGoal } from './playergoal';

const Index = () => {
    const router = useRouter();
    const [win, setWin] = useState(require('../assets/images/8Win.png'));
    const [bandr, setBandR] = useState(require('../assets/images/BandR.png'));
    const [snap, setSnap] = useState(require('../assets/images/Snap.png'));
    const [scratch, setScratch] = useState(require('../assets/images/Scratch.png'));
    const [early, setEarly] = useState(require('../assets/images/Early8.png'));
    const [wrongpocket, setWrongPocket] = useState(require('../assets/images/WrongPocket.png'));

    const [p1Name, setP1Name] = useState('Player1');
    const [p1Skill, setP1Skill] = useState('2');
    const [p1Goal, setP1Goal] = useState(2);
    const [p1Score, setP1Score] = useState(0);
    const [p1Def, setP1Def] = useState(0);
    const [p1Timeout, setP1Timeout] = useState(2);
	const [p1Active, setP1Active] = useState(true);
	const [p1Balls, setP1Balls] = useState('Open');

    const [p2Name, setP2Name] = useState('Player2');
    const [p2Skill, setP2Skill] = useState('2');
    const [p2Goal, setP2Goal] = useState(2);
    const [p2Score, setP2Score] = useState(0);
    const [p2Def, setP2Def] = useState(0);
    const [p2Timeout, setP2Timeout] = useState('2');
	const [p2Active, setP2Active] = useState(false);
	const [p2Balls, setP2Balls] = useState('Open');

	const [innings, setInnings] = useState(0);
	const [rackInns, setRackInns] = useState(0);
    const [inningsLock, setInningsLock] = useState(true);
    const [winLock, setWinLock] = useState(false);
    const [buzz, setBuzz] = useState('BuzzOff');

	const [split, setSplit] = useState('');

	const [p1BandR, setP1BandR] = useState(0);
	const [p1Snap, setP1Snap] = useState(0);
	const [p1Scratch, setP1Scratch] = useState(0);
	const [p1Early, setP1Early] = useState(0);
	const [p1WrongPocket, setP1WrongPocket] = useState(0);
	const [p2BandR, setP2BandR] = useState(0);
	const [p2Snap, setP2Snap] = useState(0);
	const [p2Scratch, setP2Scratch] = useState(0);
	const [p2Early, setP2Early] = useState(0);
	const [p2WrongPocket, setP2WrongPocket] = useState(0);

    const {
        P1Name,
        P1Skill,
        P1Goal,
        P1Score,
        P1Def,
        P1Timeout,
        P2Name,
        P2Skill,
        P2Goal,
        P2Score,
        P2Def,
        P2Timeout,
        Innings
        } = useLocalSearchParams();

    useKeepAwake();

    const navToPlayer1 = () => {
      router.push({
          pathname: '/player1',
          params: {
              p1Name: p1Name,
              p1Skill: p1Skill,
              p2Skill: p2Skill,
              p1Goal: p1Goal,
              p1Score: p1Score,
              p1Def: p1Def,
              p1Timeout: p1Timeout
          }})
        };

    const navToPlayer2 = () => {
      router.push({
          pathname: '/player2',
          params: {
              p2Name: p2Name,
              p2Skill: p2Skill,
              p1Skill: p1Skill,
              p2Goal: p2Goal,
              p2Score: p2Score,
              p2Def: p2Def,
              p2Timeout: p2Timeout
          }})
        };

    const navToInnings = () => {
      router.push({
          pathname: '/innings',
          params: {
          innings: innings
          }})
    };

    const navToSummary = () => {
    router.push({
      pathname: '/summary',
      params: {
      p1Name: p1Name,
      p1Skill: p1Skill,
      p1Goal: p1Goal,
      p1Score: p1Score,
      p1Def: p1Def,
      p2Name: p2Name,
      p2Skill: p2Skill,
      p2Goal: p2Goal,
      p2Score: p2Score,
      p2Def: p2Def,
      innings: innings,
      split: split,
      p1BandR: p1BandR,
      p1Snap: p1Snap,
      p1Scratch: p1Scratch,
      p1WrongPocket: p1WrongPocket,
      p1Early: p1Early,
      p2BandR: p2BandR,
      p2Snap: p2Snap,
      p2Scratch: p2Scratch,
      p2WrongPocket: p2WrongPocket,
      p2Early: p2Early
      }
    })
    };

    const navToHelp = () => {
        router.push({
          pathname: '/help',
        })
        };


    const toggleBuzz = () => {
        buzz === 'BuzzOff' ? setBuzz('BuzzOn') : setBuzz('BuzzOff');
    };


    const toggleP1Active = () => {
        if (!winLock) {
            if (inningsLock === false) {
                setInnings(innings + 1);
                setRackInns(rackInns + 1);
                setInningsLock(true);
                setP1Active(!p1Active);
                setP2Active(!p2Active);
                if (buzz === 'BuzzOff') Vibration.vibrate(100);
            }
        }
    };

    const toggleP2Active = () => {
        if (!winLock) {
            if (inningsLock) {
                setP1Active(!p1Active);
                setP2Active(!p2Active);
                setInningsLock(false);
                if (buzz === 'BuzzOff') Vibration.vibrate(100);
            }
        }
    };

    const toggleBalls = () => {
        if (p1Balls === 'Open') {
            setP1Balls('Solids');
            setP2Balls('Stripes');
        } else if (p1Balls === 'Solids') {
            setP1Balls('Stripes');
            setP2Balls('Solids');
        } else {
            setP1Balls('Solids');
            setP2Balls('Stripes');
        }
    };

  const resetTimeouts = () => {
      p1Skill < 4 ? setP1Timeout(2) : setP1Timeout(1);
      p2Skill < 4 ? setP2Timeout(2) : setP2Timeout(1);
  };

  const useP1TimeOut = () => {
      if (p1Active) if (p1Timeout > 0) setP1Timeout(p1Timeout - 1);
  };

  const useP2TimeOut = () => {
    if (p2Active) if (p2Timeout > 0) setP2Timeout(p2Timeout - 1);
  };

  const addP1Def = () => {
      if (p1Active) setP1Def(p1Def + 1);
  };

  const addP2Def = () => {
    if (p2Active) setP2Def(p2Def + 1);
  };

  const checkForWin = () => {
        if (p1Score >= p1Goal) {
            (p2Score === p2Goal - 1) ? setSplit('2-1') : setSplit('2-0');
            if (p2Score === 0) setSplit('3-0');
            }
        if (p2Score >= p2Goal) {
            (p1Score === p1Goal - 1) ? setSplit('1-2') : setSplit('0-2');
            if (p1Score === 0) setSplit('0-3');
            }
        if (p1Score >= p1Goal || p2Score >= p2Goal) {
            setWinLock(true);
        }
  };

   const appReset = () => {
    setP1Name('Player1');
    setP1Skill('2');
	setP1Goal(2);
	setP1Active(true);
	setP1Score(0);
	setP1Def(0);
    setP1Timeout(2);
    setP1Balls('Open');

    setP2Name('Player2');
    setP2Skill('2');
	setP2Goal(2);
    setP2Score(0);
    setP2Active(false);
    setP2Def(0);
    setP2Timeout(2);
    setP2Balls('Open');

    setP1BandR(0);
    setP1Snap(0);
    setP1Scratch(0);
    setP1WrongPocket(0);
    setP1Early(0);
    setP2BandR(0);
    setP2Snap(0);
    setP2Scratch(0);
    setP2WrongPocket(0);
    setP2Early(0);

    setRackInns(0);
	setInnings(0);
	setInningsLock(true);
    setWinLock(false);
   };

  const main = (end) => {
      if (!winLock) {
          if (end === 'win') {
              p1Active ? setP1Score(p1Score + 1) : setP2Score(p2Score + 1);
          } else if (end === 'bandr') {
              if (p1Active) {
                  setP1Score(p1Score + 1);
                  setP1BandR(p1BandR + 1);
              } else {
                  setP2Score(p2Score + 1);
                  setP2BandR(p2BandR + 1);
              }
          } else if (end === 'snap') {
                if (p1Active) {
                    setP1Score(p1Score + 1);
                    setP1Snap(p1Snap + 1);
                } else {
                    setP2Score(p2Score + 1);
                    setP2Snap(p2Snap + 1);
                }
          } else if (end === 'scratch') {
                if (p1Active) {
                    toggleP2Active()
                    setP2Score(p2Score + 1);
                    setP1Scratch(p1Scratch + 1);
                } else {
                    toggleP1Active()
                    setP1Score(p1Score + 1);
                    setP2Scratch(p2Scratch + 1);
                }
          } else if (end === 'early') {
                if (p1Active) {
                    toggleP2Active()
                    setP2Score(p2Score + 1);
                    setP1Early(p1Early + 1);
                } else {
                    toggleP1Active()
                    setP1Score(p1Score + 1);
                    setP2Early(p2Early + 1);
                }
          } else if (end === 'wrongpocket') {
                if (p1Active) {
                    toggleP2Active()
                    setP2Score(p2Score + 1);
                    setP1WrongPocket(p1WrongPocket + 1);
                } else {
                    toggleP1Active()
                    setP1Score(p1Score + 1);
                    setP2WrongPocket(p2WrongPocket + 1);
                }
      }
      setRackInns(0);
      setP1Balls('Open')
      setP2Balls('Open')
      if (buzz === 'BuzzOff') Vibration.vibrate(100);
      }
  };

    useEffect(() => {
        if (winLock) navToSummary();
        }, [winLock]);

    useEffect(() => {
        checkForWin();
        },[p1Score, p2Score]);

    useEffect(() => {
        if (P1Name) setP1Name(P1Name);
        if (P1Skill) setP1Skill(P1Skill);
        if (P1Goal) setP1Goal(P1Goal);
        if (P1Score) setP1Score(parseInt(P1Score));
        if (P1Def) setP1Def(parseInt(P1Def));
        if (P1Timeout) setP1Timeout(parseInt(P1Timeout));
        if (P2Name) setP2Name(P2Name);
        if (P2Skill) setP2Skill(P2Skill);
        if (P2Goal) setP2Goal(P2Goal);
        if (P2Score) setP2Score(parseInt(P2Score));
        if (P2Def) setP2Def(parseInt(P2Def));
        if (P2Timeout) setP2Timeout(parseInt(P2Timeout));
        if (Innings) setInnings(parseInt(Innings));
    }, [
        P1Name,
        P1Skill,
        P1Goal,
        P1Score,
        P1Def,
        P1Timeout,
        P2Name,
        P2Skill,
        P2Goal,
        P2Score,
        P2Def,
        P2Timeout,
        Innings,
    ]);

    useEffect(() => {
        setP1Goal(getGoal(p1Skill, p2Skill));
        setP2Goal(getGoal(p2Skill, p1Skill));
        },[p1Skill, p1Goal, p2Skill, p2Goal]);

    return (
      <View style={styles.main}>
          <View style={styles.row1}>
              <Pressable
              style={styles.ball}
              onPress={() => {main('scratch')}} >
                  <ImageBackground
                  source={scratch}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>

              <Pressable
              style={styles.ball}
              onPress={() => {main('early')}} >
                  <ImageBackground
                  source={early}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>

              <Pressable
              style={styles.ball}
              onPress={() => {main('wrongpocket')}} >
                  <ImageBackground
                  source={wrongpocket}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>

              <Pressable
              style={styles.ball}
              onPress={() => {main('snap')}} >
                  <ImageBackground
                  source={snap}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>

              <Pressable
              style={styles.ball}
              onPress={() => {main('bandr')}} >
                  <ImageBackground
                  source={bandr}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>

              <Pressable
              style={styles.ball}
              onPress={() => {main('win')}} >
                  <ImageBackground
                  source={win}
                  style={styles.ball}
                  ></ImageBackground>
              </Pressable>
          </View>

          <View style={styles.row2}>
              <View style={styles.player}>
                <Pressable style={styles.pressable} onPress={navToPlayer1}>
                  <Text style={styles.playerText}> {p1Name}</Text>
                 </Pressable>
              </View>
              <View  style={styles.skill}>
                <Text style={styles.skillText}>SL{p1Skill}: {p1Goal}</Text>
              </View>
              <View  style={styles.skill} >
                <Text style={styles.skillText}>SL{p2Skill}: {p2Goal}</Text>
              </View>
              <View style={styles.player}>
                  <Pressable style={styles.pressable} onPress={navToPlayer2}>
                      <Text style={styles.playerText}> {p2Name}</Text>
                  </Pressable>
              </View>

          </View>

          <View style={styles.row3}>
              <View style={styles.score}>
                  <TouchableOpacity
                      onPress={() => toggleP1Active()}
                      style={[styles.score, styles.pressable, { opacity: p1Active ? 1 : .25}]}>
                      <Text style={{ fontSize: 64}}> {p1Score}</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.metrics}>
                  <View style={styles.safeties}>
                      <Pressable onPress={() => addP1Def()}>
                          <Text style={styles.defText}>Def: {p1Def}</Text>
                      </Pressable>
                  </View>
                  <View style={styles.safeties}>
                      <Pressable onPress={() => useP1TimeOut()}>
                          <Text style={styles.defText}>Time: {p1Timeout}</Text>
                      </Pressable>
                  </View>
              </View>

              <View style={styles.metrics}>
                  <View style={styles.safeties}>
                    <Pressable onPress={() => addP2Def()}>
                        <Text style={styles.defText}>Def: {p2Def}</Text>
                    </Pressable>
                  </View>
                  <View style={styles.safeties}>
                      <Pressable onPress={() => useP2TimeOut()}>
                          <Text style={styles.defText}>Time: {p2Timeout}</Text>
                    </Pressable>
                  </View>
              </View>

              <View style={styles.score}>
                  <TouchableOpacity
                    onPress={() => toggleP2Active()}
                    style={[styles.score, styles.pressable, { opacity: p2Active ? 1 : .25}]}>
                    <Text style={{ fontSize: 64}}> {p2Score}</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={styles.row4}>
              <View style={styles.deadtotal}>
                  <Pressable onPress={toggleBalls}>
                      <Text style={{ fontSize: 18}}>P1: {p1Balls}</Text>
                  </Pressable>
              </View>

              <View style={styles.dead}>
                <Text style={{ fontSize: 18}}>R-Inn: {rackInns}</Text>
              </View>

              <View style={styles.deadtotal}>
                  <Pressable onPress={navToInnings}>
                      <Text style={{ fontSize: 18}}>T-Inn: </Text>
                  </Pressable>
                  <Pressable onPress={navToInnings}>
                <Text style={{ fontSize: 18}}>{innings}</Text>
            	</Pressable>
              </View>

              <View style={styles.deadtotal}>
                  <Pressable onPress={toggleBalls}>
                      <Text style={{ fontSize: 18}}>P2: {p2Balls}</Text>
                  </Pressable>
              </View>

          </View>
          <View style={styles.row5}>
              <View style={styles.help}>
               <Pressable
                   onPress={toggleBuzz}>
                   <Text style={{ fontSize: 18}}>{buzz}</Text>
               </Pressable>
              </View>
              <View style={styles.button}>
                  <Pressable
                      style={styles.pressable}
                      onPress={appReset}>
                      <Text style={{ fontSize: 18}}>NewGame</Text>
                  </Pressable>
              </View>
              <View style={styles.button}>
                  <Pressable
                      style={styles.pressable}
                      onPress={navToSummary}>
                      <Text style={{ fontSize: 18}}>Summary</Text>
                  </Pressable>
              </View>
              <View style={styles.help}>
               <Pressable
                   onPress={navToHelp}>
                   <Text style={{ fontSize: 18}}>Help</Text>
               </Pressable>
              </View>
          </View>

      </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#003594BF',
        padding: 4,
        },
    row1: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 40,
        },
    row2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 40,
        },
    row3: {
        flex: 3.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 40,
        },
    row4: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 40,
        },
    row5: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 40,
        },
    ball: {
        flex: 1,
        justifyContent: 'space-around',
        alignContent: 'space-around',
        height: 75,
        width: 75,
        alignItems: 'center',
        resizeMode: 'center',
        },
    help: {
        //flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //alignItems: 'center',
        //position: 'absolute',
        //bottom: 4,
        //right: 10,
        //justifyContent: 'flex-end',
        //flexDirection: 'row-reverse',
        backgroundColor: 'lightblue',
        borderRadius: 40,
        heigh: 40,
        width: 100,
        padding: 8
        },
    player:{
        flex: 3,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        },
    playerText:{
        flex:1,
        fontSize: 32,
        },
    pressable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        },
    skill:{
        flex: 1,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        },
    skillText:{
        fontSize: 24,
        },
    score:{
        flex: 3,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 100,
        },
    metrics:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 100,
        },
    safeties:{
        flex: 1,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        width: 100,
        height: 40
        },
    defText:{
            fontSize: 18,
    },
    balllist:{
        flex: 1.5,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        },
    deadtotal: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        },
    dead: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40
        },
    button:{
        //flex:1,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        height: 40,
        width: 240
        },
    nocolor: {
        backgroundColor: 'none',
        },
    });

export default Index;
