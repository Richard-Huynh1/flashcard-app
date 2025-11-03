import { useState } from "react";
import AddFlashCard from "./AddFlashCard";
import ViewFlashCard from "./ViewFlashCard";

function App() {
  const [flashcards, setFlashCards] = useState([]);
  const [viewFlashCards, setViewFlashCards] = useState(false);

  function addFlashCard(flashcard) {
    setFlashCards((prevValue) => [...prevValue, flashcard]);
  }

  return (
    <div>
      <button onClick={() => setViewFlashCards((prevValue) => !prevValue)}>
        {viewFlashCards ? "Add flashcards" : "View flashcards"}
      </button>
      {!viewFlashCards && <AddFlashCard onAdd={addFlashCard} />}
      {viewFlashCards && <ViewFlashCard flashcards={flashcards} />}
    </div>
  );
}

export default App;
