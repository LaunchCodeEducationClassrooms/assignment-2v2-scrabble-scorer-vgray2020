// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let wordSave;

function initialPrompt() {
   wordSave = input.question("Let's play some scrabble! \n\nEnter a word: ");
   oldScrabbleScorer(wordSave)
   return wordSave;
};

 
function simpleScore(word){
  word = word.toUpperCase();
  simpleScoreArray = word.split('');
  letterPoints = simpleScoreArray.length;
  return letterPoints;
};

function vowelBonusScore(word) {
  word = word.toUpperCase();
  vowelBonusArray = word.split('');
  letterPoints = 0;
  for (let i = 0; i < vowelBonusArray.length; i++) {
   if(vowelBonusArray[i] === 'A' || word[i] === 'E' || word [i] ==='I' || word[i] === 'O' || word[i] === 'U'){
     letterPoints +=3;
   } else {
     letterPoints +=1;
   }
  }
   return letterPoints;
  }

function transform(oldPointStructure) {
let newPointObj = {};
for(item in oldPointStructure){
  for(let i =0; i < oldPointStructure[Number(item)].length; i++){
    newPointObj[oldPointStructure[Number(item)] [i].toLowerCase()] = Number(item);
  }
}
  return newPointObj;
};

let newPointStructure = transform(oldPointStructure);

let scrabbleScore = function(word){
  letterPoints = 0;
  word = word.toLowerCase();
  for(let i = 0; i <word.length; i++) {
    letterPoints += Number(newPointStructure[word[i]]);
  }
  return letterPoints;
};

let simpleScoreObj = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
};

let bonusVowelObj = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
};

let scrabbleObj = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScoreObj, bonusVowelObj, scrabbleObj];

function scorerPrompt() {
  console.log('Which Scoring method would you like to use?\n');
  for(let i = 0; i <scoringAlgorithms.length; i++){
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`)
  }
  userScoreSelection = input.question('Enter 0, 1, or 2:');
  userScoreSelection = Number(userScoreSelection);
  console.log(scoringAlgorithms[userScoreSelection].scoringFunction(wordSave));

  return scoringAlgorithms[userScoreSelection].scoringFunction(wordSave);
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

