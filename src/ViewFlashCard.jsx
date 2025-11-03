import { useState, useEffect, useRef } from "react";

function ViewFlashCard(props) {
  const [currIndex, setCurrIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [method, setMethod] = useState(1);
  const [prevIndexQueue, setPrevIndexQueue] = useState([]);
  const [direction, setDirection] = useState(0);

  function normalFlashcardViewing() {
    if (currIndex + direction >= props.flashcards.length) {
      setCurrIndex(0);
    } else if (currIndex + direction < 0) {
      setCurrIndex(props.flashcards.length - 1);
    } else {
      setCurrIndex((prevValue) => prevValue + direction);
    }
  }

  function nextFlashCard() {
    setIsFlipped(false);
    switch (method) {
      // Normal flashcard viewing
      case 1:
        normalFlashcardViewing();
        setDirection(0);
        break;
      // Flashcard difficulty rating
      case 2:
        setDirection(0);
        break;
      // Random flashcard
      case 3:
        // Next card
        if (direction === 1) {
          setCurrIndex(Math.floor(Math.random() * props.flashcards.length));
        } else if (direction === -1) {
          setCurrIndex(prevIndexQueue[0]);
        }
        setDirection(0);
        break;
      default:
        normalFlashcardViewing();
        setDirection(0);
    }
  }

  useEffect(() => {
    if (direction) {
      nextFlashCard();
    }

    if (method === 3 && direction === 1) {
      setPrevIndexQueue((prevValue) => [currIndex, ...prevValue]);
    } else if (method === 3 && direction === -1) {
      const newQueue = prevIndexQueue.slice(1);
      setPrevIndexQueue(newQueue);
    }
  }, [direction]);

  return props.flashcards.length !== 0 ? (
    <div>
      <p>Flashcard viewing method:</p>
      <button onClick={() => setMethod(1)}>Normal flashcard viewing</button>
      <button>Flashcard difficulty rating</button>
      <button onClick={() => setMethod(3)}>Random flashcard</button>
      <p>
        {isFlipped
          ? props.flashcards[currIndex].back
          : props.flashcards[currIndex].front}
      </p>
      <p>
        {currIndex + 1}/{props.flashcards.length}
      </p>
      <button onClick={() => setIsFlipped((prevValue) => !prevValue)}>
        Flip card
      </button>
      <button onClick={() => setDirection(1)}>Next flashcard</button>
      <button
        onClick={() => setDirection(-1)}
        disabled={method === 3 && !prevIndexQueue.length}
      >
        Previous flashcard
      </button>
    </div>
  ) : (
    <div>
      <p>There are no flashcards.</p>
    </div>
  );
}

export default ViewFlashCard;
