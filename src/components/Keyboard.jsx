import React from "react";

function Keyboard(props) {

    const letters = props.letters;

    function handleClick(event) {
        const guess = event.target.innerText;
        props.guess(guess);
    }

    let lettersButtons = letters.map((letter, key) => (<p key={key} onClick={handleClick} className="key-button letter-button">{letter}</p>));

    return(
        <div>
            {lettersButtons}
        </div>
    )
}

export default Keyboard;