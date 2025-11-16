//css
import './App.css';

//react
import { useCallback,useEffect,useActionState,useState } from 'react';

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
function App() {

const [gameStage,setGameStage]= useState(stages[0].name);
const [word]=useState(wordsList);

const [pickedWord,setPickedWord]=useState("");
const [pickedCategory,setPickedCategory]=useState("");
const [letters,setLetters]=useState([]);

const pickedWordandCategory=()=>{
  //pick a radom category
const categories= Object.keys(word);
const category=
categories[Math.floor(Math.random()*Object.keys(word).length)];
//pick a radom word
  const words= word [category][Math.floor(Math.random()*word[category].length)];
  return {words,category}

};

// fuction start the secret word
const StartGame=()=>{

//pick word and pick category
 const {words,category} =pickedWordandCategory();

 //creat  an array of letters
 let wordLetters= words.split("");

 wordLetters= wordLetters.map((l)=>l.toLowerCase());

 //fill states
 setPickedWord(words);
 setPickedCategory(category);
 setLetters(letters);

  setGameStage(stages[1].name);

}

//process  the letter input
const verifyLetter = ()=>{
    setGameStage(stages[2].name);
}
//restarts the game
const retry=()=>{
  setGameStage(stages[0].name);
}
  return (
    <div className="App">

   {gameStage === 'Start' && <StartScreen StartGame={StartGame}/>}
   {gameStage === 'Game' && <Game verifyLetter={verifyLetter}/>}
   {gameStage === 'End'&& <GameOver retry={retry}/>}

      
    </div>
  );
}

export default App;
