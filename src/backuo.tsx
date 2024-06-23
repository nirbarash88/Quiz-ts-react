import React, { useState } from "react";
import './App.css';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  // Add more questions as needed
];

const App = () => {
  const initialSelectedOptions = quizData.map(() => "");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);
  const [feedback, setFeedback] = useState<string[]>(Array(quizData.length).fill(""));
  const [lockedQuestions, setLockedQuestions] = useState<boolean[]>(Array(quizData.length).fill(false));
  const [counter, setCounter] = useState(0);

  const handleOptionClick = (questionIndex: number, option: string) => {
    // Check if the question is already locked
    if (lockedQuestions[questionIndex]) {
      return; // Exit if the question is locked
    }

    // Proceed with setting the selected option and feedback
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = option;
    setSelectedOptions(newSelectedOptions);

    if (option === quizData[questionIndex].answer) {
      const newFeedback = [...feedback];
      newFeedback[questionIndex] = 'Correct!';
      setFeedback(newFeedback);
      // Increment the counter if the answer is correct
      incrementCounter();
    } else {
      const newFeedback = [...feedback];
      newFeedback[questionIndex] = 'Wrong.';
      setFeedback(newFeedback);
    }

    // Lock the question
    const newLockedQuestions = [...lockedQuestions];
    newLockedQuestions[questionIndex] = true;
    setLockedQuestions(newLockedQuestions);
  };

  // Function to increment the counter
  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  // Function to reset the quiz state
  const resetQuiz = () => {
    setSelectedOptions(initialSelectedOptions);
    setFeedback(Array(quizData.length).fill(""));
    setLockedQuestions(Array(quizData.length).fill(false));
    setCounter(0);
  };

  return (
    <div>
      <h1>Quiz</h1>
      <h2>Correct Answers: {counter}</h2>
      {quizData.map((item, index) => (
        <div key={index}>
          <h2>{item.question}</h2>
          <ul className="quiz-list">
            {item.options.map((option, idx) => (
              <li 
                key={idx} 
                onClick={() => handleOptionClick(index, option)} 
                className={`quiz-item ${lockedQuestions[index] ? 'locked' : ''}`}
                style={{
                  cursor: lockedQuestions[index] ? 'default' : 'pointer', // Change cursor if locked
                  backgroundColor: selectedOptions[index] === option ? 'lightblue' : 'white',
                  opacity: lockedQuestions[index] ? 0.6 : 1 // Optionally change opacity if locked
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          {feedback[index] && (
            <p className={feedback[index] === 'Correct!' ? 'feedback-correct' : 'feedback-wrong'}>
              {feedback[index]}
            </p>
          )}
        </div>
      ))}
      {lockedQuestions.every(locked => locked) && (
        <button onClick={resetQuiz}>Try Again</button>
      )}
    </div>
  );
};

export default App;
