import { useState } from "react";

function AddFlashCard(props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashCard, setFlashCard] = useState({ front: "", back: "" });

  function handleChange(event) {
    const value = event.target.value;
    setFlashCard((prevValue) =>
      isFlipped ? { ...prevValue, back: value } : { ...prevValue, front: value }
    );
  }

  return (
    <div>
      <input
        onChange={handleChange}
        placeholder={isFlipped ? "Flashcard back" : "Flashcard front"}
        value={isFlipped ? flashCard.back : flashCard.front}
      />
      <button onClick={() => setIsFlipped((prevValue) => !prevValue)}>
        Flip card
      </button>
      <button
        onClick={() => {
          props.onAdd(flashCard);
          setFlashCard({ front: "", back: "" });
        }}
      >
        Add card
      </button>
    </div>
  );
}

export default AddFlashCard;
