import React, { useState } from "react";
import randomWords from "random-words";
import Game from "./Game";

var n = 0;

function App() {

    const [word, setWord] = useState(randomWords().toUpperCase());
    const [manImage, setManImage] = useState("images/0.png");
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [result, setResult] = useState("");
    const [wordResult, setWordResult] = useState("");

    function changeImage(n) {
        setManImage(`images/${n}.png`)
    }

    function increaseN(){
        n = n + 1;
        return n;
    }

    function getN() {
        return n;
    }

    function endGame(result, resultWord) {
        setResult(result);
        setWordResult(resultWord);
        setGameEnd(true);
    }

    function startGame(){
        n = 0;
        changeImage(n)
        setWord(randomWords().toUpperCase());
        setGameEnd(false);
        setGameStarted(true)
    }

    return (
        <div>
            {gameEnd ? (
                <div className="title">
                    <h1>{result}</h1>
                    <h5>Correct answer: "{wordResult}"</h5>
                    <div onClick={startGame}>
                     <img className="play-button" src="images/play-button.png" alt="play button" />
                    </div>
                </div>
            ) : (
                <div className="title">
                {gameStarted ? (
                    <div>
                        <div className="hang">
                            <img className="man-img" src={manImage} alt="" />
                        </div>
                        <div className="hud">
                            <Game word={word} handleMiss={changeImage} nAdd={increaseN} getN={getN} endGame={endGame} />
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1>Hangman</h1>
                        <div onClick={startGame} >
                            <img className="play-button" src="images/play-button.png" alt="play button" />
                        </div>
                    </div>
                )}
                </div>
            )}
        </div>
    );
}

export default App;