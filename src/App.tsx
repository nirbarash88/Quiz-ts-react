import React, { useState } from "react";
import './App.css';
import Question from "./Question";
import Score from "./Score";

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
      setCounter(prevCounter => prevCounter + 1);
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

  const resetQuiz = () => {
    setSelectedOptions(initialSelectedOptions);
    setFeedback(Array(quizData.length).fill(""));
    setLockedQuestions(Array(quizData.length).fill(false));
    setCounter(0);
  };

  return (
    <div>
      <h1>Quiz</h1>
      <Score counter={counter} resetQuiz={resetQuiz} />
      {quizData.map((item, index) => (
        <Question
          key={index}
          index={index}
          question={item.question}
          options={item.options}
          answer={item.answer}
          selectedOption={selectedOptions[index]}
          feedback={feedback[index]}
          locked={lockedQuestions[index]}
          handleOptionClick={handleOptionClick}
        />
      ))}
    </div>
  );
};

export default App;
