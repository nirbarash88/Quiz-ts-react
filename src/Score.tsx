import React from "react";

type ScoreProps = {
  counter: number;
  resetQuiz: () => void;
};

const Score: React.FC<ScoreProps> = ({ counter, resetQuiz }) => {
  return (
    <div>
      <h2>Correct Answers: {counter}</h2>
      {/* Show the "Try Again" button conditionally */}
      {counter > 0 && (
        <button onClick={resetQuiz}>Try Again</button>
      )}
    </div>
  );
};

export default Score;
