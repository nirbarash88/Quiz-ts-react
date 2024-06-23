import React from "react";

type QuestionProps = {
  index: number;
  question: string;
  options: string[];
  answer: string;
  selectedOption: string;
  feedback: string;
  locked: boolean;
  handleOptionClick: (questionIndex: number, option: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  index,
  question,
  options,
  selectedOption,
  feedback,
  locked,
  handleOptionClick
}) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul className="quiz-list">
        {options.map((option, idx) => (
          <li 
            key={idx} 
            onClick={() => handleOptionClick(index, option)} 
            className={`quiz-item ${locked ? 'locked' : ''}`}
            style={{
              cursor: locked ? 'default' : 'pointer',
              backgroundColor: selectedOption === option ? 'lightblue' : 'white',
              opacity: locked ? 0.6 : 1
            }}
          >
            {option}
          </li>
        ))}
      </ul>
      {feedback && (
        <p className={feedback === 'Correct!' ? 'feedback-correct' : 'feedback-wrong'}>
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Question;
