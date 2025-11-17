//css
import './App.css';

//react
import { useCallback,useEffect,useState } from 'react';

//data
import{wordsList} from './Data/word';

//components
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

//stages the secret word
const  stages=[
  {id:1,name:"Start"},
  {id:2,name:"Game"},
  {id:3, name:"End"},
]
const guessesQty=5;
function App() {

const [gameStage,setGameStage]= useState(stages[0].name);
const [words]=useState(wordsList);

const [pickedWord,setPickedWord]=useState("");
const [pickedCategory,setPickedCategory]=useState("");
const [letters,setLetters]=useState([]);
const [guessedLetters,setGuessedLetters]=useState([]);
const [wrongLetters,setWrongLetters]=useState([]);
const [guesses,setGuesses]=useState(guessesQty);
const [score,setScore]=useState(0);


const pickedWordandCategory=useCallback(()=>{
  //pick a radom category
const categories= Object.keys(words);
const category=
categories[Math.floor(Math.random()*Object.keys(categories).length)];
console.log(category);

//pick a radom word
  const word= words[category][Math.floor(Math.random()*words[category].length)];
  return {word,category}

},[words]);

// fuction start the secret word
const StartGame=useCallback(()=>{

  clearLetterStates();

//pick word and pick category
 const {word,category} =pickedWordandCategory();

 //creat  an array of letters
 let wordLetters= word.split("");

 wordLetters= wordLetters.map((l)=>l.toLowerCase());
console.log(word,category);
console.log(wordLetters);
 //fill states
 setPickedWord(word);
 setPickedCategory(category);
 setLetters(wordLetters);

  setGameStage(stages[1].name);

},[pickedWordandCategory])

//process  the letter input
const verifyLetter = (letter)=>{
  
  const normalizedLetter= letter.toLowerCase();

  //check if letter has already been utilized
  if(guessedLetters.includes(normalizedLetter)||wrongLetters.includes(normalizedLetter)){
return;
  }
  //push guessed  letter or remove a guess
if (letters.includes(normalizedLetter)){
setGuessedLetters((actualGuessedLetters)=>[
  ...actualGuessedLetters,normalizedLetter
])
}else{
setWrongLetters((actualwrongLetters)=>[
  ...actualwrongLetters,normalizedLetter
])
setGuesses((actualGuesses)=>actualGuesses -1)
}
};
const clearLetterStates=()=>{
  setGuessedLetters([])
  setWrongLetters([])
}

useEffect(() => {
  if (guesses <= 0) {
    clearLetterStates();
    setGameStage(stages[2].name);
  }
}, [guesses]);  // <-- fecha só o useEffect

useEffect(()=>{

const uniqueLetters=[...new Set(letters)]

//win condition
if(guessedLetters.length===uniqueLetters.length){
  //add score 
  setScore((actualScore)=>actualScore+=100)
  //restart game
StartGame();
}
},[guessedLetters,letters,StartGame])


//restarts the game
const retry=()=>{
  setScore(0)
  setGameStage(guessesQty)
  setGameStage(stages[0].name);
}
  return (
    <div className="App">

   {gameStage === 'Start' && <StartScreen StartGame={StartGame}/>}
   {gameStage === 'Game' && <Game verifyLetter={verifyLetter}
   pickedWord={pickedWord}
   pickedCategory={pickedCategory}
   letters={letters}
   guessedLetters={guessedLetters}
   wrongLetters={wrongLetters}
   guesses={guesses}
   score={score}
   />}
   {gameStage === 'End'&& <GameOver retry={retry} score={score}/>}

      
    </div>
  );
}

export default App;
