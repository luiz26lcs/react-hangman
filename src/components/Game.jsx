import React, { useEffect, useState } from "react";
import Keyboard from "./Keyboard";


function Game(props) {
    const [letters, setLetters] = useState(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"]);
    const [letters2, setLetters2] = useState(["Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);

    const word = props.word;
    const [wordHide, setWordHide] = useState("");

    function startGame() {
        let newWord = "";
        for(var n = 0; n < word.length; n++) {
            newWord += "_";
        }
        setWordHide(newWord);
    }

    function handleClick(chosenLetter) {
        let newHide = "";
        let gotItRight = false;
        for(var n = 0; n < word.length; n++) {
            if(wordHide[n] === "_"){
                if(chosenLetter === word[n]){
                    newHide += chosenLetter;
                    gotItRight = true;
                } else {
                    newHide += "_";
                }
            } else {
                newHide += (word[n])
            }
        }
        setWordHide(newHide);

        if (gotItRight) {
            const nMiss = props.getN();
            checkEnd(word, newHide, nMiss);
        } else {
            var w = props.nAdd();
            props.handleMiss(w);
            checkEnd(word, newHide, w);
        }

        if (letters.indexOf(chosenLetter) !== -1){
            letters.splice(letters.indexOf(chosenLetter), 1)
            setLetters(letters);
        } else {
            letters2.splice(letters2.indexOf(chosenLetter), 1)
            setLetters2(letters2);
        }
    }

    function checkEnd(string1, string2, nM) {
        if(string1 === string2){
            props.endGame("You Won", string1);
        } else if (nM >= 6) {
            props.endGame("You Lost", string1);
        }
    }

    function showLetter() {
        function chooseRandom() {
            let randomN = 0;
            while (wordHide[randomN] !== "_"){
                randomN = Math.floor(Math.random() * word.length);
            }
            return randomN;
        }

        let chosenN = chooseRandom();
        let letter = word[chosenN];
        handleClick(letter);
    }

    useEffect(() => {
        startGame()
    }, [])

    return(
        <div>
            <div>
                <p className="game-word">{wordHide}</p>
                <p onClick={showLetter} className="key-button tip-button">?</p>
            </div>
            <div className="input-area">
                <Keyboard letters={letters} guess={handleClick} />
                <Keyboard letters={letters2} guess={handleClick} />
            </div>
        </div>
    );
}

export default Game;