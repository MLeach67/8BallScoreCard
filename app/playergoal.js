let mygoal = ''
const skill2 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '2';
  if (yourSkill === '3') mygoal = '2';
  if (yourSkill === '4') mygoal = '2';
  if (yourSkill === '5') mygoal = '2';
  if (yourSkill === '6') mygoal = '2';
  if (yourSkill === '7') mygoal = '2';
  return mygoal;
};

const skill3 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '3';
  if (yourSkill === '3') mygoal = '2';
  if (yourSkill === '4') mygoal = '2';
  if (yourSkill === '5') mygoal = '2';
  if (yourSkill === '6') mygoal = '2';
  if (yourSkill === '7') mygoal = '2';
  return mygoal;
};

const skill4 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '4';
  if (yourSkill === '3') mygoal = '3';
  if (yourSkill === '4') mygoal = '3';
  if (yourSkill === '5') mygoal = '3';
  if (yourSkill === '6') mygoal = '3';
  if (yourSkill === '7') mygoal = '2';
  return mygoal;
};

const skill5 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '5';
  if (yourSkill === '3') mygoal = '4';
  if (yourSkill === '4') mygoal = '4';
  if (yourSkill === '5') mygoal = '4';
  if (yourSkill === '6') mygoal = '4';
  if (yourSkill === '7') mygoal = '3';
  return mygoal;
};

const skill6 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '6';
  if (yourSkill === '3') mygoal = '5';
  if (yourSkill === '4') mygoal = '5';
  if (yourSkill === '5') mygoal = '5';
  if (yourSkill === '6') mygoal = '5';
  if (yourSkill === '7') mygoal = '4';
  return mygoal;
};

const skill7 = (yourSkill) => {
  if (yourSkill === '2') mygoal = '7';
  if (yourSkill === '3') mygoal = '6';
  if (yourSkill === '4') mygoal = '5';
  if (yourSkill === '5') mygoal = '5';
  if (yourSkill === '6') mygoal = '5';
  if (yourSkill === '7') mygoal = '5';
  return mygoal;
};

export function getGoal(mySkill, yourSkill) {
  if (mySkill === '2') {let mygoal = skill2(yourSkill)}
  if (mySkill === '3') {let mygoal = skill3(yourSkill)}
  if (mySkill === '4') {let mygoal = skill4(yourSkill)}
  if (mySkill === '5') {let mygoal = skill5(yourSkill)}
  if (mySkill === '6') {let mygoal = skill6(yourSkill)}
  if (mySkill === '7') {let mygoal = skill7(yourSkill)}
  return mygoal;
};

export function flipSplit(str) {
    return str.split("-").reverse().join("-");
};

