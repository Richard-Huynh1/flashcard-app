import { useState } from "react";

function ViewFlashCard(props) {
  const [currIndex, setCurrIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function nextFlashCard(direction) {
    setIsFlipped(false);
    if (currIndex + direction >= props.flashcards.length) {
      setCurrIndex(0);
    } else if (currIndex + direction < 0) {
      setCurrIndex(props.flashcards.length - 1);
    } else {
      setCurrIndex((prevValue) => prevValue + direction);
    }
  }

  return props.flashcards.length !== 0 ? (
    <div>
      <p>{(isFlipped) ? props.flashcards[currIndex].back : props.flashcards[currIndex].front}</p>
      <p>{currIndex + 1}/{props.flashcards.length}</p>
      <button onClick={() => setIsFlipped((prevValue) => !prevValue)}>
        Flip card
      </button>
      <button onClick={() => nextFlashCard(1)}>Next flashcard</button>
      <button onClick={() => nextFlashCard(-1)}>Previous flashcard</button>
    </div>
  ) : (
    <div>
      <p>There are no flashcards.</p>
    </div>
  );
}

export default ViewFlashCard;
